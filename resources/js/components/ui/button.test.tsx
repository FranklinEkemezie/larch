import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
    it('renders its label', () => {
        render(<Button>Track progress</Button>);

        expect(
            screen.getByRole('button', { name: 'Track progress' }),
        ).toBeInTheDocument();
    });

    it('applies the requested variant', () => {
        render(<Button variant="outline">Outline</Button>);

        expect(screen.getByRole('button', { name: 'Outline' })).toHaveAttribute(
            'data-variant',
            'outline',
        );
    });
});
