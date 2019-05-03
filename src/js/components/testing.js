export default function($) {
    /***************************************
	 ***************************************
	 *
	 * Hey Man
	 *
	 *
	 **************************************
	 **************************************/
    console.log('hello world!');

    $(function() {
        $('[data-toggle="popover"]').popover();
    });
    function sum(x, y, z) {
        return x + y + z;
    }

    const numbers = [1, 2, 3];

    console.log(sum(...numbers));
    console.log(`hey ${numbers}`);

    fetch('https://next.json-generator.com/api/json/get/41wSMpW58')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));
        });

    function resolveAfter2Seconds() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 2000);
        });
    }

    async function asyncCall() {
        console.log('calling');
        var result = await resolveAfter2Seconds();
        console.log(result);
        // expected output: 'resolved'
    }

    asyncCall();
}
