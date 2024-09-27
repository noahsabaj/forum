import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewPostForm from '../NewPostForm';

test('renders NewPostForm and allows submission', () => {
    const onPostCreated = jest.fn();

    const { getByPlaceholderText, getByText } = render(
        <NewPostForm communityId="test-community" onPostCreated={onPostCreated} />
    );

    fireEvent.change(getByPlaceholderText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(getByPlaceholderText('Content'), { target: { value: 'Test Content' } });
    fireEvent.click(getByText('Post'));

    // You would need to mock supabase methods to test submission
});
