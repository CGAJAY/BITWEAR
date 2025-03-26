import {create} from 'zustand';

// Define the types for our state
type AuthStore = {
  isLoggedIn: boolean;
  cartItems: Array<{ id: string; name: string; quantity: number }>;
  login: (email: string, password: string) => Promise<{ status: string; message: string; user?: object }>;
  logout: () => Promise<{ status: string; message: string }>;
  addToCart: (item: { id: string; name: string; quantity: number }) => { status: string; message: string };
  removeFromCart: (itemId: string) => { status: string; message: string };
  clearCart: () => { status: string; message: string };
  loadCartFromLocalStorage: () => { status: string; message: string };
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false, // Default logged-out state
  cartItems: [], // Default empty cart state
  login: async (email, password) => {
    try {
      // Simulate login API call (can replace with real API logic)
      if (email === 'user@example.com' && password === 'password') {
        const user = { email }; // Mock user data (can be replaced with actual data)
        set({ isLoggedIn: true });
        return { status: 'success', message: 'Login successful!', user };
      } else {
        return { status: 'error', message: 'Invalid email or password.' };
      }
    } catch (error) {
      return { status: 'error', message: 'Login failed. Please try again.' };
    }
  },
  logout: async () => {
    // Simulate logout logic here (e.g., clearing cookies, tokens)
    set({ isLoggedIn: false });
    return { status: 'success', message: 'Logout successful!' };
  },
  addToCart: (item) => {
    set((state) => {
      const updatedCart = [...state.cartItems, item];
      if (!state.isLoggedIn) {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      return { cartItems: updatedCart };
    });
    return { status: 'success', message: 'Item added to cart.' };
  },
  
  removeFromCart: (itemId) => {
    set((state) => {
      const updatedCart = state.cartItems.filter(item => item.id !== itemId);
      if (!state.isLoggedIn) {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      return { cartItems: updatedCart };
    });
    return { status: 'success', message: 'Item removed from cart.' };
  },
  
  clearCart: () => {
    set(() => {
      localStorage.removeItem('cart'); // Clear the cart from localStorage
      return { cartItems: [] };
    });
    return { status: 'success', message: 'Cart cleared.' };
  },

  loadCartFromLocalStorage: () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      set({ cartItems: JSON.parse(storedCart) });
      return { status: 'success', message: 'Cart loaded from localStorage.' };
    } else {
      return { status: 'info', message: 'No cart found in localStorage.' };
    }
  },
}));
