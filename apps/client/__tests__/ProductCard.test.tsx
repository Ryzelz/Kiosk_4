/**
 * TC-01 — Product Listing Page Renders Correctly
 *
 * Verifies that ProductCard renders the product name and formatted price.
 * ProductCard takes a full `product` object (not flat name/price props).
 */
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';

// Mock Next.js image and link (also handled by nextJest, but explicit is safer)
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock('react-toastify', () => ({
  toast: { success: jest.fn() },
}));

// Mock Zustand cart store
jest.mock('@/stores/cartStore', () => ({
  __esModule: true,
  default: () => ({ addToCart: jest.fn() }),
}));

const mockProduct = {
  id: 1,
  name: 'Cold Brew Coffee',
  shortDescription: 'Smooth cold brew.',
  description: 'Full description here.',
  price: 250,
  sizes: ['250ml', '1L'] as [string, ...string[]],
  colors: ['black'] as [string, ...string[]],
  images: { '250ml': '/products/cold_brew.png', '1L': '/products/cold_brew_1L.png' },
  category: 'Coffee',
};

test('renders product name and price', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByText('Cold Brew Coffee')).toBeInTheDocument();
  expect(screen.getByText('₱250.00')).toBeInTheDocument();
});
