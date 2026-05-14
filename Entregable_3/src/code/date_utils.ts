export function getPast30Days(): string[] {
  const dates: string[] = [];
  
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    dates.push(`${day}-${month}-${year}`);
  }
  
  return dates;
}