export function exportExcel(data,type,fileName){
    if (!data) {
		return
	}
    const link = document.createElement('a');
	let blob = new Blob([data], {type:type});
    link.style.display = 'none';
	link.href = URL.createObjectURL(blob);
	link.setAttribute('download', fileName);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}