export function exportExcel(data,fileName){
    if (!data) {
		return
	}
    const link = document.createElement('a');
	let blob = new Blob([data], {type: 'application/vnd.ms-excel'});
    link.style.display = 'none';
	link.href = URL.createObjectURL(blob);
	link.setAttribute('download', fileName + '.xls');
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}