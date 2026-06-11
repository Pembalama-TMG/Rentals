export const calculateRentalCost = (startDate, endDate, pricePerKm, dailyRate, rentalType, distance = 0) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  if (rentalType === 'perKm') {
    return distance * pricePerKm;
  } else if (rentalType === 'fullDay') {
    return days * dailyRate;
  }
  return 0;
};

export const generateBookingId = () => {
  return `BK${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
};

export const calculateRefund = (totalCost, cancellationPercent) => {
  return totalCost * (1 - cancellationPercent / 100);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ne-NP', {
    style: 'currency',
    currency: 'NPR',
  }).format(amount);
};
