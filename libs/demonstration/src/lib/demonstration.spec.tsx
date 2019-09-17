import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Demonstration from './demonstration';

describe(' Demonstration', () => {
  afterEach(cleanup);

  it('should render successfully', () => {
    const { baseElement } = render(<Demonstration />);
    expect(baseElement).toBeTruthy();
  });
});
