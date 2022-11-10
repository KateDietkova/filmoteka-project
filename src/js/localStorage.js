// addToStorage = (key, value) => {
//   try {
//     if (typeof value === 'string') {
//       localStorage.setItem(key, value);
//     } else {
//       localStorage.setItem(key, JSON.stringify(value));
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// getFromStorage = key => {
//   try {
//     return JSON.parse(localStorage.getItem(key));
//   } catch (error) {
//     console.error(error);
//   }
// };

// removeFromStorage = key => {
//   try {
//     localStorage.removeItem(key);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export { addToStorage, getFromStorage, removeFromStorage };
