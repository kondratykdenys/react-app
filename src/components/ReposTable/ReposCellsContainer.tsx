import React, { FunctionComponent } from 'react';

import { gql, useQuery } from '@apollo/client';

import TableCell from '@material-ui/core/TableCell';

import ReposCells from './ReposCells';

const GET_REPO = gql`
  query($query: String!) {
    search(query: $query, type: REPOSITORY, first: 1) {
      nodes {
        ... on Repository {
          name
          forks {
            totalCount
          }
          stargazerCount
          createdAt
          defaultBranchRef {
            repository {
              url
              releases(last: 1) {
                edges {
                  node {
                    publishedAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface ReposCellsContainerProps {
  reposName: string;
}

const ReposCellsContainer: FunctionComponent<ReposCellsContainerProps> = ({ reposName }) => {
  const { loading, error, data } = useQuery(GET_REPO, {
    variables: { query: reposName }
  });

  if (loading) return <TableCell>Loading..</TableCell>;
  if (error) return <TableCell>Error! {error}</TableCell>;

  const {
    name,
    stargazerCount: stars,
    forks: { totalCount: forksCount },
    defaultBranchRef: { repository },
    createdAt
  } = data?.search?.nodes[0];

  const {
    url: repoUrl,
    releases: { edges }
  } = repository;

  const [created, lastRelease] = [createdAt, edges[0]?.node?.publishedAt].map((date) =>
    new Date(date).toLocaleDateString()
  );

  return (
    <ReposCells
      name={name}
      stars={stars}
      forks={forksCount}
      repoUrl={repoUrl}
      created={created}
      lastRelease={lastRelease}
    />
  );
};

export default ReposCellsContainer;
