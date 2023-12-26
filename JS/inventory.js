function showContent(index) {
//    const sideNavItems = document.querySelectorAll('.sideNav li');

//    sideNavItems.forEach(item => item.classList.remove('active'));

//    sideNavItems[index].classList.add('active');

//    const contentType = document.querySelectorAll('.contentType');

//    contentType.forEach(content => content.classList.remove('active'));

//    contentType[index].classList.add('active');

    const contentTypes = document.querySelectorAll('.contentType');
    contentTypes.forEach(content => content.style.display = 'none');
    contentTypes[index].style.display = 'flex';
}

document.getElementById('categorySelect').addEventListener('change', function() {
    var selectedOption = this.options[this.selectedIndex].value;
    const preViewType = document.querySelector('.breadcrumbs .type');
    console.log('選擇的項目是:', selectedOption);
})
