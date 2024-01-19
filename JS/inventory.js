// document.querySelectorAll('.topNav li').forEach(function (category, index) {
//     category.addEventListener('click', function() {

//         document.querySelectorAll('.topNav li').forEach(function(content){
//             content.classList.remove('active');
//         });
//         document.querySelector('.topNav li:nth-child('+ (index + 1) +')').classList.add('active');
        
//         document.querySelectorAll('.contentType').forEach(function(content) {
//             content.classList.remove('active');
//         });
        
//         document.querySelector('.contentType:nth-child('+ (index + 1) +')').classList.add('active');
//     })
// })

// document.getElementById('categorySelect').addEventListener('change', function() {
//     var selectedOption = this.options[this.selectedIndex].value;
//     const preViewType = document.querySelector('.breadcrumbs');
//     var selectedOptionElement = document.createElement('p');

//     selectedOptionElement.textContent = selectedOption;
//     preViewType.appendChild(selectedOptionElement);

//     selectedOptionElement.addEventListener('click',function(){
//         var category = document.querySelector('.contentType');
//         category.classList.remove('active');
        
//         document.querySelectorAll('.topNav li').forEach(function(content){
//             content.classList.remove('active');
//         });
//         document.querySelector('.topNav li:nth-child(3)').classList.add('active');
//     });
// })

function setActiveClass(elements, index) {
    elements.forEach(function (element) {
        element.classList.remove('active');
    });
    elements[index].classList.add('active');
}

document.querySelectorAll('.topNav li').forEach(function (category, index) {
    category.addEventListener('click', function () {
        const topNavItems = document.querySelectorAll('.topNav li');
        setActiveClass(topNavItems, index);

        const contentTypeItems = document.querySelectorAll('.contentType');
        setActiveClass(contentTypeItems, index);
    });
});

let isFirstChange = true;
let selectedOptionElement;

document.getElementById('categorySelect').addEventListener('change', function () {
    let selectedOption = this.options[this.selectedIndex].value;
    const preViewType = document.querySelector('.breadcrumbs');

    if (isFirstChange) {
        selectedOptionElement = document.createElement('p');
        selectedOptionElement.addEventListener('click', function () {
            const contentTypeItems = document.querySelectorAll('.contentType');
            setActiveClass(contentTypeItems, 2);
    
            const topNavItems = document.querySelectorAll('.topNav li');
            setActiveClass(topNavItems, 2);
        });
        
        preViewType.appendChild(selectedOptionElement);
        isFirstChange = false;
    }
    
    selectedOptionElement.textContent = selectedOption;
    selectedOptionElement.classList.add('category');
});

let firstAdd = true;

document.getElementById('productName').addEventListener('input', function () {
    let inputValue = this.value;
    const preViewType = document.querySelector('.breadcrumbs');

    if (inputValue) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('pdName');
        newDiv.textContent = inputValue;

        if (firstAdd) {
            preViewType.insertAdjacentElement('afterend', newDiv);
            firstAdd = false;
        } else {
            let existingDiv = document.querySelector('.pdName');
            if (existingDiv) {
                existingDiv.textContent = inputValue;
            }
        }
    } else {
        let existingDiv = document.querySelector('.pdName');
        if (existingDiv) {
            existingDiv.remove();
        }
        firstAdd = true;
    }
});

document.getElementById('productPrice').addEventListener("input", function() {
    let inputValue = this.value;
    const priceTag = document.querySelector('.price p');

    if (inputValue) {
        priceTag.textContent = inputValue;
    } else {
        priceTag.textContent = '0';
    }
})

document.getElementById('picURL').addEventListener('input', function() {
    let inputValue = this.value;
    const picPreview = document.querySelector('.preview .pic');

    if(inputValue) {
        picPreview.style.backgroundImage= 'url('+ inputValue + ')';
    } else {
        picPreview.style.backgroundImage= 'none';
    }
})

document.getElementById('addProductBtn').addEventListener('click', function (event) {

    let category = document.getElementById('categorySelect').value;
    let productName = document.getElementById('productName').value;
    let productPrice = document.getElementById('productPrice').value;
    let picURL = document.getElementById('picURL').value;

    let newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td><input type="text" value="${productName}" disabled></td>
        <td><input type="text" value="${productPrice}" disabled></td>
        <td><input type="text" value="${productPrice}" disabled></td>
        <td><p onclick="showPic()">查看圖片</p></td>
        <td><p onclick="editDetail()">編輯</p onclick=></td>
    `;

    document.querySelector('.inventoryTable tbody').appendChild(newRow);
});

function editDetail(event) {
    let tdElement = event.target.parentNode;
    let trElement = event.target.parentNode;
    let inputElements = trElement.querySelectorAll('input');

    inputElements.forEach(input => {
        input.disabled = false;
    });

    event.target.onclick = saveEdit;
}