import Home from '@/app/page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Page', () => {
    it('renders', async () => {
        // When
        render(<Home />);
        const homeHeader = await screen.findByRole('heading', {
            name: 'Home',
        });
        const loginLink = screen.getByRole('link', {
            name: 'Login',
        });

        // Then
        expect(homeHeader).toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();
    });
});
