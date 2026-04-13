/**
 * TC-04 — Category Filter Displays Correct Products
 *
 * When ProductList receives a `products` prop, clicking a category tab
 * should show only products belonging to that category.
 *
 * ProductList's external-products path renders inline category buttons
 * (not the router-based Categories component), so next/navigation is not needed.
 */
import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from '@/components/ProductList';
import { ProductType } from '@/types';

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

jest.mock('@/stores/cartStore', () => ({
  __esModule: true,
  default: () => ({ addToCart: jest.fn() }),
}));

// next/navigation is imported by Categories.tsx but the external-products
// code path doesn't render Categories, so mock it defensively.
jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
}));

const products: ProductType[] = [
  {
    id: 1,
    name: 'Cold Brew',
    category: 'Coffee',
    shortDescription: '',
    description: '',
    price: 250,
    sizes: ['250ml'] as [string, ...string[]],
    colors: ['black'] as [string, ...string[]],
    images: { '250ml': '/products/test.png' },
  },
  {
    id: 2,
    name: 'Guji Beans',
    category: 'Beans',
    shortDescription: '',
    description: '',
    price: 500,
    sizes: ['200g'] as [string, ...string[]],
    colors: [''] as [string, ...string[]],
    images: { '200g': '/products/test2.png' },
  },
];

test('filters products by Beans category', () => {
  render(<ProductList products={products} />);

  // Before filtering: both products should be visible
  expect(screen.getByText('Cold Brew')).toBeInTheDocument();
  expect(screen.getByText('Guji Beans')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Beans'));

  expect(screen.getByText('Guji Beans')).toBeInTheDocument();
  expect(screen.queryByText('Cold Brew')).not.toBeInTheDocument();
});
