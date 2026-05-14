export function getPast30Days(): string[] {
  let dates: string[] = [];
  
  for (let i = 0; i < 30; i++) {
    let d = new Date();
    d.setDate(d.getDate() - i);
    
    let day = String(d.getDate()).padStart(2, '0');
    let month = String(d.getMonth() + 1).padStart(2, '0');
    let year = d.getFullYear();
    
    dates.push(`${day}-${month}-${year}`);
  }
  
  return dates;
}