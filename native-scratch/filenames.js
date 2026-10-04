export function datedFilename(stem,extension,date=new Date()){
 const datePart=[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('');
 return `${String(stem).replace(/[\\/:*?"<>|]/g,'_')}_${datePart}.${extension}`;
}
