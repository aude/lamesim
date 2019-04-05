(function() {
    window.data;
    window.index = -1;

    function getFetchUrl() {
        let userValue = document.querySelector('#url').value;
        let url = userValue;

        return url;
    }

    function getFetchFrequency() {
        const defaultValue = 5;
        let userValue = parseInt(document.querySelector('#frequency').value);
        let frequency = !isNaN(userValue) ? userValue : defaultValue;

        // convert seconds to milliseconds
        frequency *= 1000;

        return frequency;
    }

    function processData(newData) {
        data = newData;
    }

    function showError(error) {
        console.error(error);
    }

    function uiLoop() {
        console.info('ui');

        let framesCount = data['frames'].length;

        if (index < framesCount-1) {
            index += 1;
        } else {
            index = 0;
        }

        let frame = data['frames'][index];

        document.querySelector('#raw').innerHTML = '<pre>' + JSON.stringify(data) + '</pre>';
        document.querySelector('#icon').innerHTML = frame.icon;
        document.querySelector('#text').innerHTML = frame.text;
    }

    function fetchLoop() {
        console.info('fetch');

        fetch(getFetchUrl())
            .then((resp) => resp.json()) // parse data to JSON
            .then(function(data) {
                processData(data);
            })
            .catch(function(error) {
                showError(error);
            })
        ;

        window.setTimeout(fetchLoop, getFetchFrequency());
    }

    // fire off loops
    // update UI every 5s
    window.setInterval(uiLoop, 5000);
    // update data every 5s first time, but let the user choose the frequency
    window.setTimeout(fetchLoop, 1);
}());
