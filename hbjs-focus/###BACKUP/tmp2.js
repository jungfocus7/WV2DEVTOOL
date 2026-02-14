/*
const cc = 100; // column count
const rc = 1000; // row count
const rca = new Array(cc); // row cell arr (행의 셀을 수집하는 배열)
const rla = new Array(rc); // row line arr (행을 수집하는 배열)
for (let j = 0; j < rc; j++) {
	rca.fill(undefined);
	for (let i = 0; i < cc; i++) {
		rca[i] = _ftd.get(j, i);
	}
	rla[j] = rca;
}


이런식으로 하려고 하거든...
rca는 거의 고정되어도 상관없지만
rla는 반복적으로 늘어나기 때문에 완전히 가변적이거든

rca[i] = _ftd.get(j, i);
이부분에서 셀의 내용을 하나하나 채워주고

rla[j] = rca;
한줄씩 행이 완성되면 수집하는건데
여기서 rca.splic로 복사하는게 여기서는 가장 현명한 성능이겠지?



*/