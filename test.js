const tmp={a:1,b:'2'}

console.log(tmp);
tmp.a=134
console.log(tmp);
Object.assign(tmp,{b:+tmp.b,c:'erty'})
console.log(tmp)
tmp.d=12345;
console.log(tmp)
tmp['x']='abc';
console.log(tmp)