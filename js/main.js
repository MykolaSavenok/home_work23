const allGoods = [
   {
      name: 'Футболка Urkaine для дорослих',
      image: 'img/product/01.jpg',
      category: 't-shirts',
      price: 700,
      description: 'Відмінно «дихає», не витягується та не сідає. Матеріал повністю безпечний для людей з алергією.Пеньє виготовляється з бавовни (95%) та еластану (5%), є найдорожчою серед всіх різновидів трикотажу. Після обробки спеціальним складом виходить гладка та дуже приємна на дотик матерія. Не кошлатиться та не обростає некрасивими катунцями, що відбувається з тканинами нижчої якості. Через високий вміст бавовни тканинка дихає не парить у літку.'
   },
   {
      name: 'Футболка Urkaine дитяча',
      image: 'img/product/02.jpg',
      category: 't-shirts',
      price: 500,
      description: 'Відмінно «дихає», не витягується та не сідає. Матеріал повністю безпечний для людей з алергією.Пеньє виготовляється з бавовни (95%) та еластану (5%).'
   },
   {
      name: 'Світшот чоловічий чорний',
      image: 'img/product/03.jpg',
      category: 'sweatshirts',
      price: 1400,
      description: 'Худі надзвичайно приємні до тіла. Власне виробництво, використовуємо найкращу тканину для пошиття речей. Речі з нашого магазину не втрачають форми та не обростають катунцями, що стає з речами дешевшого сегмента.'
   },
   {
      name: 'Світшот жіночий білий',
      image: 'img/product/04.jpg',
      category: 'sweatshirts',
      price: 995,
      description: 'Худі надзвичайно приємні до тіла. Власне виробництво, використовуємо найкращу тканину для пошиття речей. Речі з нашого магазину не втрачають форми та не обростають катунцями, що стає з речами дешевшого сегмента.'
   },
   {
      name: "Патріотича чашка",
      image: 'img/product/05.jpg',
      category: 'cups',
      price: 335,
      description: 'Чашка синя всередині 350мл з патріотичним принтом дівчина з квітами'
   },
   {
      name: "Чашка з тризубом",
      image: 'img/product/06.jpg',
      category: 'cups',
      price: 455,
      description: 'Чашка жовта всередині 330мл з патріотичним принтом тризуб'
   }
];

const goods = [];
const myOrdersList = [];

const showProduct = document.querySelector('.item__products');
const menuNavBar = document.querySelectorAll('.navbar__body');
const orderInfo = document.querySelector('.modal__content');
const formCancel = document.querySelector('.form__cancel')
const orderForm = document.querySelector('.form');
const showModal = document.querySelector('.modal');
const showMyOrders = document.querySelector('.orders-list');



menuNavBar.forEach(menuItem => {
   menuItem.addEventListener('click', (event) => {
      let filterClass = event.target.dataset['filter'];
      const filteredGoods = allGoods.filter(product => product.category === filterClass);

      goods.length = 0;
      goods.push(...filteredGoods);

      displayProducts(filteredGoods);
   });
});


function displayProducts(products) {
   showProduct.innerHTML = '';

   products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'item__product';
      productElement.innerHTML = `
         <h2>${product.name}</h2>
         <img src="${product.image}">
         <p>${product.description}</p>
         <div>Ціна: ${product.price} грн.</div>
         <button class="buy-btn">Купити</button>
      `;

      const buyButton = productElement.querySelector('.buy-btn');
      buyButton.addEventListener('click', () => {
         handleBuyClick(product);
      });

      showProduct.appendChild(productElement);
   });
}

let selectedProduct = null;

function handleBuyClick(product) {
   selectedProduct = product;
   orderForm.classList.add('active')
}

const savedOrders = JSON.parse(localStorage.getItem('myOrders')) || [];


savedOrders.forEach(savedOrder => {
   myOrdersList.push(savedOrder);
});


function saveOrdersToLocalStorage() {
   localStorage.setItem('myOrders', JSON.stringify(myOrdersList));
}


showMyOrders.addEventListener('click', (event) => {
   if (event.target.classList.contains('delete-order')) {
      const orderElement = event.target.parentElement;
      const orderIndex = Array.from(showMyOrders.children).indexOf(orderElement);

      if (orderIndex !== -1) {
         myOrdersList.splice(orderIndex, 1);
         orderElement.remove();
         saveOrdersToLocalStorage(); 
      }
   }
});


orderForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const fullName = document.getElementById('name').value;
   const city = document.getElementById('city').value;
   const novaPoshta = document.getElementById('post').value;
   const paymentMethod = document.getElementById('paymethod').value;
   const quantity = document.getElementById('quantity').value;
   const comment = document.getElementById('yourcomment').value;


   if (fullName && city && novaPoshta && paymentMethod && quantity) {
      orderInfo.innerHTML = `
      <h2>Інформація про замовлення:</h2>
      <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
      <p>Ви замовили: ${selectedProduct.name}</p>
      <p>Ціна: ${selectedProduct.price} грн.</p>
      <p>ПІБ покупця: ${fullName}</p>
      <p>Місто: ${city}</p>
      <p>Склад Нової пошти: ${novaPoshta}</p>
      <p>Спосіб оплати: ${paymentMethod}</p>
      <p>Кількість продукції: ${quantity}</p>
      <p>Коментар до замовлення: ${comment}</p>
      <button class="close-modal">Закрити</button>
         `;

      showModal.classList.toggle('active');
      const closeButton = orderInfo.querySelector('.close-modal');
      closeButton.addEventListener('click', () => {
         orderForm.classList.toggle('active');
         showModal.classList.toggle('active');
      });

      myOrdersList.push({
         product: selectedProduct,
         fullName,
         city,
         novaPoshta,
         paymentMethod,
         quantity,
         comment,
      });

      saveOrdersToLocalStorage();

      orderForm.reset();
   } else {
      orderInfo.innerHTML = '<p class="error">Будь ласка, заповніть всі обов\'язкові поля</p>';
   }
});


formCancel.addEventListener('click', () => {
   orderForm.classList.remove('active')
})




const myOrder = document.querySelector('#myOreders');
myOrder.addEventListener('click', () => {
   menuNavBar.forEach(link => link.style.display = 'none');
   orderForm.style.display = 'none';
   showProduct.style.display = 'none';
   showMyOrders.innerHTML = '';


   myOrdersList.forEach(order => {
      const orderElement = document.createElement('div');
      orderElement.className = 'order__item';
      orderElement.innerHTML = `
         <h2>${order.product.name}</h2>
         <img src="${order.product.image}">
         <p>Ціна: ${order.product.price} грн.</p>
         <p>ПІБ покупця: ${order.fullName}</p>
         <p>Місто: ${order.city}</p>
         <p>Склад Нової пошти: ${order.novaPoshta}</p>
         <p>Спосіб оплати: ${order.paymentMethod}</p>
         <p>Кількість продукції: ${order.quantity}</p>
         <p>Коментар до замовлення: ${order.comment}</p>
         <button class="delete-order">Видалити</button>
      `;

      const deleteButton = orderElement.querySelector('.delete-order');
      deleteButton.addEventListener('click', () => {

         myOrdersList.splice(myOrdersList.indexOf(order), 1);
         orderElement.remove();
         saveOrdersToLocalStorage();
      });

      showMyOrders.appendChild(orderElement);
   });
});