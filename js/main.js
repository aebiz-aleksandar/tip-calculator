    //Variables:
    const billEl = document.querySelector('.bill');
    const peopleEl = document.querySelector('.num-people')
    const billInput = document.querySelector('#bill-input');
    const peopleInput = document.querySelector('#people-input');
    const tipCustomInput = document.querySelector('.tip-item-custom');
    const tipItems = document.querySelector('.tip-items');
    const amountValue = document.querySelector('#amount-value');
    const totalValue = document.querySelector('#total-value');
    const resetBtn = document.querySelector('.btn-reset');

    let percent = 0;

    //Function: Calculate Value
    function calculateValue() {
        const billValue = billInput.value || 0;
        const peopleValue = peopleInput.value || 0;
        console.log(billValue, peopleValue, percent);
        if (billValue > 0 && peopleValue > 0) {
            const amount = (billValue * percent) / peopleValue;
            const total = (billValue * (1 + percent)) / peopleValue;
            amountValue.textContent = `$ ${ amount.toFixed(2) }`;
            totalValue.textContent = `$ ${ total.toFixed(2) }`;
        }
    }

    //Function: Show Message
    function showMessage(container, message) {
        const h4 = document.createElement('h4');
        h4.classList.add('holder-title', 'holder-title-error');
        h4.appendChild(document.createTextNode(message));
        const targetEl = container.querySelector('div');
        targetEl.appendChild(h4);
        container.classList.add('input-error');
    }
    //Function: Hide Message
    function hideMessage() {
        billEl.className = 'bill';
        peopleEl.className = 'num-people';
        const titles = document.querySelectorAll('.holder-title-error');
        if (titles.length > 0) {
            titles.forEach(title => {
                title.parentNode.removeChild(title);
            });
        }
    }

    //Funtion: Check Value
    function checkValue() {
        const billValue = billInput.value;
        const peopleValue = peopleInput.value

        hideMessage();

        if (billValue == '' || billValue == 0) {
            showMessage(billEl, "Can't be zero");
        }
        if (billValue < 0) {
            showMessage(billEl, "Can't be negative number");
        }
        if (peopleValue == '' || peopleValue == 0) {
            showMessage(peopleEl, "Can't be zero");
        }
        if (peopleValue < 0) {
            showMessage(peopleEl, "Can't be negative number");
        }
        if (billValue && billValue > 0 && peopleValue && peopleValue > 0) {
            calculateValue();
        }
    }

    //Function: Reset Value
    function resetValue() {
        billInput.value = '';
        peopleInput.value = '';
        tipCustomInput.value = '';
        percent = 0;
        amountValue.textContent = `$ 0.00`;
        totalValue.textContent = `$ 0.00`;
        document.querySelectorAll('.tip-item').forEach(item => {
            item.classList.remove('active');
        });
    }

    //Event: Change Bill Input
    billInput.addEventListener('input', checkValue);
    //Event: Change People Input
    peopleInput.addEventListener('input', checkValue);
    //Event: Set Percent
    tipItems.addEventListener('click', e => {
        const element = e.target;
        if (element.className === 'tip-item') {
            document.querySelectorAll('.tip-item').forEach(item => {
                item.classList.remove('active');
            });
            element.classList.add('active');
            const elementPercent = element.textContent.replace('%', '');
            percent = elementPercent / 100;
            calculateValue();
        }
    });
    //Event: Set Custom Precent with custom tip item
    tipCustomInput.addEventListener('blur', e => {
        if (e.currentTarget.value > 0) {
            document.querySelectorAll('.tip-item').forEach(item => {
                item.classList.remove('active');
            });
            percent = e.currentTarget.value / 100;
            calculateValue();
        }
    });
    //Event: Reset Value
    resetBtn.addEventListener('click', resetValue);
