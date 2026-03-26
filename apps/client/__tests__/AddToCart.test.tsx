/**
 * TC-02 — Add to Cart Button Updates Cart State
 *
 * Clicking "Add to Cart" should call the Zustand store's addToCart and
 * increment the cart count shown via a test-local CartCount display.
 *
 * The project uses Zustand (not CartContext), so the test renders a local
 * CartCount component alongside ProductCard to assert state changes.
 */
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import useCartStore from '@/stores/cartStore';

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

const mockProduct = {
  id: 99,
  name: 'Cold Brew Coffee',
  shortDescription: 'Smooth cold brew.',
  description: 'Full description here.',
  price: 250,
  sizes: ['250ml'] as [string, ...string[]],
  colors: ['black'] as [string, ...string[]],
  images: { '250ml': '/products/cold_brew.png' },
  category: 'Coffee',
};

// Displays the current cart item count via data-testid="cart-count"
const CartCount = () => {
  const { cart } = useCartStore();
  return <span data-testid="cart-count">{cart.length}</span>;
};

beforeEach(() => {
  // Reset cart between tests so they are independent
  useCartStore.getState().clearCart();
});

test('add to cart increments count', () => {
  render(
    <>
      <ProductCard product={mockProduct} />
      <CartCount />
    </>,
  );

  expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
  expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
});
