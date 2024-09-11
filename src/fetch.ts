const url = "http://tt.weather.sojson.com/api/weather/city/101030100";
async function test() {
  const resp = await fetch(url, {
    method: 'GET'
  });
  const { data, errors } = await resp.json();
  if (resp.ok) {
    console.log('Data:', data);
  } else {
    console.log('Errors:', errors);
  }

  const ret = fetch(url).then(
    resp => console.log('Resp:', resp)
  ).catch(
    errors => console.log('Errors:', errors)
  );
  console.log('Ret:', ret);
}
test();
