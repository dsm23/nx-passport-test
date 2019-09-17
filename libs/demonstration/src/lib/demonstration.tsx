import React from 'react';
import styled from 'styled-components';

import fetch from 'node-fetch';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { RestLink } from 'apollo-link-rest';

import { Form, Field } from 'react-final-form';

import { users } from '@nx-password-test/users';

// https://stackoverflow.com/questions/4212503/how-can-i-set-the-request-header-for-curl/45313572
// weird hack
global.Headers = fetch.Headers;

const restLink = new RestLink({
  uri: 'https://reqres.in/api' // this is your API base url
  // credentials: "same-origin"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(restLink),
  cache: new InMemoryCache()
});

/* eslint-disable-next-line */
export interface DemonstrationProps {}

const StyledDemonstration = styled.div`
  color: hotpink;
`;

export const Demonstration = (props: DemonstrationProps) => {
  return (
    <StyledDemonstration>
      <>
        <h1>Welcome to demonstration component!</h1>
        <ApolloProvider client={client}>
          <Form onSubmit={() => {}}>
            {({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Enter name</label>
                </div>
                <div>
                  <Field id="name" name="inputName" component="input" />
                </div>
                <div>
                  <label htmlFor="password">Enter password</label>
                </div>
                <div>
                  <Field id="password" name="inputPassword" component="input" />
                </div>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <h2>Only accepted users</h2>
                <table>
                  <tr>
                    <th>name</th>
                    <th>password</th>
                  </tr>
                  {users.map(({ username, password }) => (
                    <tr>
                      <td>{username}</td>
                      <td>{password}</td>
                    </tr>
                  ))}
                </table>
              </form>
            )}
          </Form>
        </ApolloProvider>
      </>
    </StyledDemonstration>
  );
};

export default Demonstration;
