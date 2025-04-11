export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
export const formatTime2 = (dateString: string, flightData: number): string => {
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + (flightData ?? 0));
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const handleChange = (e: number) => {
  switch (e) {
    case 0:
      return "ПЕРЕСАДОК";
    case 1:
      return "ПЕРЕСАДКА";
    case 2:
    case 3:
      return "ПЕРЕСАДКИ";
  }
};
