import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SimpsonsQuote from './SimpsonsQuote';

const server = setupServer(
  rest.get(
    'https://thesimpsonsquoteapi.glitch.me/quotes',
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            character: 'Homer Simpson',
            quote: 'In theory, Communish works! In theory.',
            image: 'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939',
            characterDirection: 'Right',
          }
        ])
      );
    }
  )
);

describe('SimpsonsQuote container', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('displays a simpson character and quote', async () => {
    render(<SimpsonsQuote />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    return waitFor(() => {
      screen.getByAltText('Homer Simpson');
      screen.getByText('In theory, Communish works! In theory.');
    });
  });
});

