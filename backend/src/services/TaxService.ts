export const FUEL_DATA = {
  BUY: {
    GASOLINE: [5.92, 5.95, 5.90, 5.94, 5.93, 5.90, 5.89, 5.99, 6.04, 6.01, 6.03, 6.08],
    ETHANOL: [3.38, 3.53, 3.56, 3.63, 3.82, 3.81, 4.09, 4.06, 4.07, 4.03, 4.02, 4.10],
    DIESEL: [5.87, 5.88, 5.84, 5.85, 5.86, 5.83, 5.93, 5.93, 5.91, 5.92, 5.96, 6.01],
    TAX: [0.172, 0.193, 0.181, 0.192, 0.197, 0.201, 0.206, 0.211, 0.216, 0.221, 0.226, 0.231]
  },
  SELL: {
    GASOLINE: [5.94, 5.97, 5.92, 5.96, 5.95, 5.92, 5.91, 6.01, 6.06, 6.03, 6.05, 6.10],
    ETHANOL: [3.40, 3.55, 3.58, 3.65, 3.84, 3.83, 4.11, 4.08, 4.09, 4.05, 4.04, 4.12],
    DIESEL: [5.88, 5.90, 5.86, 5.87, 5.88, 5.85, 5.95, 5.95, 5.93, 5.94, 5.98, 6.03],
    TAX: [0.170, 0.190, 0.180, 0.190, 0.195, 0.200, 0.205, 0.210, 0.215, 0.220, 0.225, 0.230]
  }
};

export const SELIC = 1.115; // 11,5% de correção conforme enunciado

export const calculateUpdatedValue = (type: 'BUY' | 'SELL', product: 'GASOLINE' | 'ETHANOL' | 'DIESEL', date: Date, quantity: number) => {
  const month = new Date(date).getMonth(); // 0 = Jan, 11 = Dez
  
  const price = FUEL_DATA[type][product][month];
  const tax = FUEL_DATA[type].TAX[month];
  
  // Quantidade * Preço * Tributo * Selic
  return quantity * price * tax * SELIC;
};