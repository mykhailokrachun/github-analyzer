import { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import dynamic from 'next/dynamic.js';

const Pie3D = dynamic(() => import('./Charts/Pie3D'), {
  ssr: false,
});

const Doughnut2D = dynamic(() => import('./Charts/Doughnut2d'), {
  ssr: false,
});

const Column3D = dynamic(() => import('./Charts/Column3D'), {
  ssr: false,
});

const Bar3D = dynamic(() => import('./Charts/Bar3D'), {
  ssr: false,
});

interface ReduceLanguagesReturnType {
  [x: string]: { label: string; value: number; stars: number };
}

interface StarsAndForksType {
  [x: number]: { label: string; value: number };
}
interface ReduceStarsAndForksReturnType {
  stars: StarsAndForksType;
  forks: StarsAndForksType;
}

const Repos = () => {
  const { repos } = useContext(GithubContext);

  const languages = repos.reduce<ReduceLanguagesReturnType>((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = {
        label: language,
        value: 1,
        stars: stargazers_count,
      };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  // most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  // stars, forks
  const { stars, forks } = repos.reduce<ReduceStarsAndForksReturnType>(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = {
        label: name,
        value: stargazers_count,
      };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    { stars: {}, forks: {} }
  );

  const starsArray = Object.values(stars).slice(-5).reverse();
  const forksArray = Object.values(forks).slice(-5).reverse();

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <Column3D data={starsArray} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forksArray} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
