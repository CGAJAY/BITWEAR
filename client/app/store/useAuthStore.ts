import { create } from 'zustand';

// Define the types for our state
type AuthStore = {
  isLoggedIn: boolean;
  cartItems: Array<{ id: string; name: string; quantity: number }>;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ status: string; message: string; user?: object }>;
  logout: () => Promise<{ status: string; message: string }>;
  addToCart: (item: { id: string; name: string; quantity: number }) => Promise<{ status: string; message: string }>; // Asynchronous
  removeFromCart: (itemId: string) => Promise<{ status: string; message: string }>;
  clearCart: () => Promise<{ status: string; message: string }>;
  loadCartFromLocalStorage: () => Promise<{ status: string; message: string }>;
  setLoading: (isLoading: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  cartItems: [],
  loading: false,
  login: async (email, password) => {
    set({ loading: true });
    try {
      if (email === 'user@example.com' && password === 'password') {
        const user = { email };
        set({ isLoggedIn: true });
        set({ loading: false });
        return { status: 'success', message: 'Login successful!', user };
      } else {
        set({ loading: false });
        return { status: 'error', message: 'Invalid email or password.' };
      }
    } catch (error) {
      set({ loading: false });
      return { status: 'error', message: 'Login failed. Please try again.' };
    }
  },
  logout: async () => {
    set({ loading: true });
    set({ isLoggedIn: false });
    set({ loading: false });
    return { status: 'success', message: 'Logout successful!' };
  },
  addToCart: async (item) => {
    set((state) => {
      const updatedCart = [...state.cartItems, item];
      if (!state.isLoggedIn) {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      return { cartItems: updatedCart };
    });
    return new Promise<{ status: string; message: string }>((resolve) => {
      resolve({ status: 'success', message: 'Item added to cart.' });
    });
  },
  removeFromCart: async (itemId) => {
    set((state) => {
      const updatedCart = state.cartItems.filter(item => item.id !== itemId);
      if (!state.isLoggedIn) {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      return { cartItems: updatedCart };
    });
    return new Promise<{ status: string; message: string }>((resolve) => {
      resolve({ status: 'success', message: 'Item removed from cart.' });
    });
  },
  clearCart: async () => {
    set(() => {
      localStorage.removeItem('cart');
      return { cartItems: [] };
    });
    return new Promise<{ status: string; message: string }>((resolve) => {
      resolve({ status: 'success', message: 'Cart cleared.' });
    });
  },
  loadCartFromLocalStorage: async () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      set({ cartItems: JSON.parse(storedCart) });
      return new Promise<{ status: string; message: string }>((resolve) => {
        resolve({ status: 'success', message: 'Cart loaded from localStorage.' });
      });
    } else {
      return new Promise<{ status: string; message: string }>((resolve) => {
        resolve({ status: 'info', message: 'No cart found in localStorage.' });
      });
    }
  },
  setLoading: (isLoading: boolean) => set({ loading: isLoading }),
}));
