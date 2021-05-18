import React from 'react';
import { render } from 'react-dom';
import { SimpsonsQuote } from './SimpsonsQuote';

describe('SimpsonsQuote container', () => {
  it('displays a simpson character and quote', async () => {
    render(<SimpsonsQuote />);
    screen.getByText('Quote');

  });
});

