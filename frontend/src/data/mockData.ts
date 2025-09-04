import { Product, Category, Order } from '../types';

// export const mockProducts: Product[] = [
//   {
//     id: '1',
//     name: 'Mild Cleanser',
//     description: 'Indulge yourself with a skincare routine that will leave you looking and feeling your best. This intentional bento has been carefully curated to cater to sensitive skin, making it an ideal choice if your complexion requires a little extra gentle love & care.',
//     price: 29.99,
//     image: 'https://in.ilemjapan.com/cdn/shop/files/SFS-Fe-su_Bento.jpg?v=1750316874&width=750',
//     images: [
//       'https://in.ilemjapan.com/cdn/shop/files/SFS-Fe-su_Bento.jpg?v=1750316874&width=750',
//       'https://in.ilemjapan.com/cdn/shop/files/SFS-Fe-su_Bento.jpg?v=1750316874&width=750'
//     ],
//     category: 'herbs',
//     ingredients: ['Japanese Fermented Rice Extract', 'Alpine Rose Stem Cells'],
//     benefits: ['Softens and rejuvenates the skin', 'Boost collagen production'],
//     usage: 'Mild Cleanser (145mL / 4.9fl. oz.) - Use daily as part of your skincare routine.',
//     inStock: true,
//     stockQuantity: 50,
//     rating: 4.8,
//     reviews: [],
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '2',
//     name: 'Japanese Brown Rice Green Tea',
//     description: 'A traditional Japanese brown rice green tea embodying a harmonious fusion of green tea leaves and roasted brown rice.',
//     price: 24.99,
//     image: 'https://in.ilemjapan.com/cdn/shop/files/8.webp?v=1748868906&width=750',
//     images: [
//       'https://in.ilemjapan.com/cdn/shop/files/8.webp?v=1748868906&width=750'
//     ],
//     category: 'teas',
//     ingredients: ['Green tea leaves', 'Roasted brown rice'],
//     benefits: ['Rich in essential nutrients such as vitamin B, protein, calcium', 'Health-boosting elements including magnesium and iron'],
//     usage: 'Steep 1 teaspoon in hot water for 3-5 minutes',
//     inStock: true,
//     stockQuantity: 30,
//     rating: 4.6,
//     reviews: [],
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '3',
//     name: 'Hojicha Japanese Roasted Green Tea',
//     description: 'Enjoy the rich aroma and calming flavour of Hojicha green tea, a soothing brew from the heart of Japan.',
//     price: 19.99,
//     image: 'https://in.ilemjapan.com/cdn/shop/files/6_0e4bd143-0837-47dd-85a6-d88f9faf66ad.webp?v=1748868762&width=750',
//     images: [
//       'https://in.ilemjapan.com/cdn/shop/files/6_0e4bd143-0837-47dd-85a6-d88f9faf66ad.webp?v=1748868762&width=750'
//     ],
//     category: 'teas',
//     ingredients: ['Green tea leaves', 'Roasted brown rice'],
//     benefits: ['Rich in essential nutrients such as vitamin B, protein, calcium', 'Health-boosting elements including magnesium and iron'],
//     usage: 'Steep 1 teaspoon in hot water for 3-5 minutes',
//     inStock: true,
//     stockQuantity: 25,
//     rating: 4.9,
//     reviews: [],
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '4',
//     name: 'SKINTILLATE - Booster Oil',
//     description: 'Experience magic like never before with our light & nourishing Skintillate Booster Oil which heals your skin & leaves you glowing from within.',
//     price: 16.99,
//     image: 'https://9skin.in/cdn/shop/files/Skintallate-1.jpg?v=1695917436&width=823',
//     images: [
//       'https://9skin.in/cdn/shop/files/Skintallate-1.jpg?v=1695917436&width=823'
//     ],
//     category: 'oils',
//     ingredients: ['100% pure neem oil'],
//     benefits: ['Heals skin | Renewal properties | Nourishes skin'],
//     usage: 'Apply topically to skin or hair as needed',
//     inStock: true,
//     stockQuantity: 40,
//     rating: 4.4,
//     reviews: [],
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '5',
//     name: 'Cream Team Gift Bundle',
//     description: 'Ignite the passion and pamper your skin with our exclusive Cream Team combo – the ultimate duo for a love-infused glow! ',
//     price: 22.99,
//     image: 'https://9skin.in/cdn/shop/files/9SkinValentines-963-Edit.jpg?v=1707738348&width=823',
//     images: [
//       'https://9skin.in/cdn/shop/files/9SkinValentines-963-Edit.jpg?v=1707738348&width=823'
//     ],
//     category: 'herbs',
//     ingredients: ['Rejuvenate | Revive'],
//     benefits: [' Achieve sublime radiance with the Revive Day Cream – your daily dose of self-care for visibly smoother, glowing skin.'],
//     usage: 'Apply a small amount to clean skin, massage gently until absorbed',
//     inStock: true,
//     stockQuantity: 35,
//     rating: 4.7,
//     reviews: [],
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '6',
//     name: 'Gentle Shampoo',
//     description: 'A Silicone-Free, Everyday-Use Shampoo',
//     price: 27.99,
//     image: 'https://in.ilemjapan.com/cdn/shop/files/Gentle_Shampoo-min.jpg?v=1742386208&width=750',
//     images: [
//       'https://in.ilemjapan.com/cdn/shop/files/Gentle_Shampoo-min.jpg?v=1742386208&width=750'
//     ],
//     category: 'Shampoos',
//     ingredients: ['Bacopa monnieri (Brahmi) extract'],
//     benefits: ['Nourishing Formula', 'Gentle & Silicone-Free.', 'All Hair Types'],
//     usage: 'Take 1 capsule twice daily with meals',
//     inStock: true,
//     stockQuantity: 28,
//     rating: 4.5,
//     reviews: [],
//     createdAt: new Date().toISOString(),
//   },
// ];

// export const mockCategories: Category[] = [
//   {
//     id: '1',
//     name: 'Herbs',
//     description: 'Traditional Ayurvedic herbs',
//     image: 'https://9skin.in/cdn/shop/files/9SkinValentines-963-Edit.jpg?v=1707738348&width=823',
//   },
//   {
//     id: '2',
//     name: 'Capsules & Tablets',
//     description: 'Convenient herbal supplements in capsule form',
//     image: 'https://in.ilemjapan.com/cdn/shop/files/8.webp?v=1748868906&width=750',
//   },
//   {
//     id: '3',
//     name: 'Herbal Teas',
//     description: 'Soothing and therapeutic herbal tea blends',
//     image: 'https://in.ilemjapan.com/cdn/shop/files/6_0e4bd143-0837-47dd-85a6-d88f9faf66ad.webp?v=1748868762&width=750',
//   },
//   {
//     id: '4',
//     name: 'Essential Oils',
//     description: 'Pure and natural essential oils for wellness',
//     image: 'https://9skin.in/cdn/shop/files/Skintallate-1.jpg?v=1695917436&width=823',
//   },
// ];

// export const mockOrders: Order[] = [
//   {
//     id: '1',
//     userId: '1',
//     user: {
//       id: '1',
//       email: 'customer@example.com',
//       firstName: 'John',
//       lastName: 'Doe',
//       role: 'customer',
//       createdAt: new Date().toISOString(),
//     },
//     items: [
//       {
//         id: '1',
//         productId: '1',
//         product: mockProducts[0],
//         quantity: 2,
//         price: 29.99,
//       },
//     ],
//     totalAmount: 59.98,
//     status: 'pending',
//     shippingAddress: {
//       street: '123 Main St',
//       city: 'New York',
//       state: 'NY',
//       zipCode: '10001',
//       country: 'USA',
//     },
//     paymentMethod: 'Credit Card',
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// ];