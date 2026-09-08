const novedades = [
  {
    id: 1,
    titulo: 'Cómo almacenar un cilindro de gas de forma segura',
    imagen: '../img/AlmGasDeFormSeg.jpg',
    resumen: 'Recomendaciones simples para mantener tu cilindro en buenas condiciones.',
    detalle: 'Mantén el cilindro siempre en posición vertical, en un lugar ventilado, protegido del sol directo y lejos de fuentes de calor. No lo guardes en sótanos ni intentes repararlo por tu cuenta. Ante cualquier olor extraño, cierra la válvula, ventila el lugar y comunícate con un servicio autorizado.'
  },
  {
    id: 2,
    titulo: 'Elige el formato adecuado para tu hogar',
    imagen: '../img/FormatoAdecuado.jpg',
    resumen: 'Te ayudamos a comparar formatos según tu consumo y rutina.',
    detalle: 'Para consumos ocasionales, el formato de 5 kg puede ser suficiente. Las familias que cocinan diariamente suelen preferir 11 o 15 kg, mientras que un negocio o un hogar grande puede necesitar 45 kg. Observa tu frecuencia de recambio y pide orientación antes de decidir.'
  },
  {
    id: 3,
    titulo: 'Regalo en tu primera compra',
    imagen: '../img/BolsaDeTelaMasLogo.jpg',
    resumen: 'En tu primera compra podrás llevarte una bolsa de tela o una alcancía de la marca.',
    detalle: 'Queremos acompañarte también fuera de casa. En tu primera compra puedes elegir uno de estos dos regalos: una bolsa de tela reutilizable o una alcancía de Gas El Volcán.',
    regalos: [
      { nombre: 'Bolsa de tela', imagen: '../img/BolsaDeTelaMasLogo.jpg' },
      { nombre: 'Alcancía', imagen: '../img/AlcanciaMasLogo.jpg' }
    ]
  }
];
const regiones = {
  'Región Metropolitana': ['Santiago', 'Maipú', 'Puente Alto', 'Quilicura'],
  'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
  'Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chiguayante'],
  'La Araucanía': ['Temuco', 'Padre Las Casas', 'Villarrica']
};

const productosAdminIniciales = [
  { codigo: 'CL001', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 5 kg', descripcion: 'Cilindro de gas licuado de petróleo 5 kg. Para uso residencial (cocina, calefacción pequeña).', unidad: 'Unidad', precioResidencial: 6500, precioComercial: 6000, stock: 80 },
  { codigo: 'CL002', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 11 kg', descripcion: 'Cilindro estándar doméstico. El más utilizado en hogares chilenos. Compatible con reguladores estándar.', unidad: 'Unidad', precioResidencial: 12000, precioComercial: 11000, stock: 200 },
  { codigo: 'CL003', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 15 kg', descripcion: 'Cilindro de mayor capacidad para hogares de alto consumo o locales pequeños.', unidad: 'Unidad', precioResidencial: 16000, precioComercial: 14500, stock: 90 },
  { codigo: 'CL004', categoria: 'Cilindros de Gas', nombre: 'Cilindro GLP 45 kg', descripcion: 'Cilindro industrial. Uso comercial: restaurantes, talleres, calefacción de locales.', unidad: 'Unidad', precioResidencial: 45000, precioComercial: 40000, stock: 30 },
  { codigo: 'RG001', categoria: 'Reguladores', nombre: 'Regulador doméstico estándar', descripcion: 'Regulador de 1 etapa para cilindros 5, 11 y 15 kg. Presión de salida 28 mbar.', unidad: 'Unidad', precioResidencial: 8990, precioComercial: 8200, stock: 45 },
  { codigo: 'RG002', categoria: 'Reguladores', nombre: 'Regulador de alta presión', descripcion: 'Regulador para cocinas industriales o equipos de mayor consumo. Presión regulable.', unidad: 'Unidad', precioResidencial: 18990, precioComercial: 17000, stock: 12 },
  { codigo: 'RG003', categoria: 'Reguladores', nombre: 'Regulador dual (2 salidas)', descripcion: 'Permite conectar dos artefactos simultáneamente al mismo cilindro.', unidad: 'Unidad', precioResidencial: 14990, precioComercial: 13500, stock: 18 },
  { codigo: 'MG001', categoria: 'Mangueras y Conexiones', nombre: 'Manguera gas 1.5 m', descripcion: 'Manguera flexible homologada. Diámetro interior 9mm. Compatible con reguladores estándar.', unidad: 'Unidad', precioResidencial: 3990, precioComercial: 3500, stock: 80 },
  { codigo: 'MG002', categoria: 'Mangueras y Conexiones', nombre: 'Manguera gas 3 m', descripcion: 'Manguera larga para instalaciones donde el artefacto está alejado del cilindro.', unidad: 'Unidad', precioResidencial: 6990, precioComercial: 6200, stock: 50 },
  { codigo: 'MG003', categoria: 'Mangueras y Conexiones', nombre: 'Abrazadera metálica', descripcion: 'Abrazadera de acero para asegurar la conexión manguera-regulador y manguera-artefacto.', unidad: 'Unidad', precioResidencial: 990, precioComercial: 800, stock: 200 },
  { codigo: 'MG004', categoria: 'Mangueras y Conexiones', nombre: 'Kit conexión completo', descripcion: 'Todo lo necesario para instalar un cilindro nuevo: regulador, manguera 1.5m y abrazaderas.', unidad: 'Kit', precioResidencial: 12990, precioComercial: 11500, stock: 25 },
  { codigo: 'AC001', categoria: 'Accesorios', nombre: 'Carro porta cilindro 11/15 kg', descripcion: 'Carro metálico con ruedas para transportar cilindros dentro del hogar con seguridad.', unidad: 'Unidad', precioResidencial: 12990, precioComercial: 11000, stock: 20 },
  { codigo: 'AC002', categoria: 'Accesorios', nombre: 'Tapa protectora para válvula', descripcion: 'Tapa de plástico ABS para proteger la válvula del cilindro durante el transporte.', unidad: 'Unidad', precioResidencial: 1490, precioComercial: 1200, stock: 60 },
  { codigo: 'AC003', categoria: 'Accesorios', nombre: 'Detector de gas a batería', descripcion: 'Sensor electroquímico. Alarma sonora y visual ante fuga de gas GLP o metano.', unidad: 'Unidad', precioResidencial: 19990, precioComercial: 17000, stock: 8 }
];

const usuariosIniciales = [
  { run: '12345678K', nombre: 'Camila', apellidos: 'Soto', email: 'camila@ejemplo.cl', rol: 'Cliente', password: 'Camila1234' },
  { run: '111111111', nombre: 'Administrador', apellidos: 'Demo', email: 'admin@gasvolcan.cl', rol: 'Administrador', password: 'Admin1234' }
];

function getSessionList(key, initial) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    sessionStorage.setItem(key, JSON.stringify(initial));
    return initial.slice();
  }
  return JSON.parse(stored);
}

function saveSessionList(key, list) {
  sessionStorage.setItem(key, JSON.stringify(list));
}

function getUsuarios() {
  return getSessionList('gasVolcanUsuarios', usuariosIniciales);
}

function getProductosAdmin() {
  return getSessionList('gasVolcanProductos', productosAdminIniciales);
}

const imagenesCatalogo = {
  CL001: '../img/Galon5Kg.jpg',
  CL002: '../img/Galon11Kg.jpg',
  CL003: '../img/Galon15Kg.jpg',
  CL004: '../img/Galon45Kg.jpg',
  RG001: '../img/ReguladorDeGas5-11-15kg.jpg',
  RG002: '../img/RegDGasAltaPres.jpg',
  RG003: '../img/ReguladorDoble(2Salidas).jpg',
  MG001: '../img/MangueraGas1.5m.jpg',
  MG002: '../img/MangueraGas3m.jpg',
  MG003: '../img/AbrazaderasGas.jpg',
  MG004: '../img/KitConexionCompleto.jpg',
  AC001: '../img/CarroPortaGalones11-15Kg-.jpg',
  AC002: '../img/TapaProtectoraGas.jpg',
  AC003: '../img/DetectorGasBateria.jpg'
};

function getCatalogProducts() {
  return getProductosAdmin().map(product => {
    const shortDescription = product.descripcion.split('. ')[0].trim();

    return {
      id: product.codigo,
      codigo: product.codigo,
      nombre: product.nombre,
      precio: product.precioResidencial,
      categoria: product.categoria,
      imagen: imagenesCatalogo[product.codigo] || '../img/ChanchitoYPrecio.jpg',
      descripcion: shortDescription.endsWith('.') ? shortDescription : shortDescription + '.',
      detalle: product.descripcion
    };
  });
}

function dinero(valor) {
  return '$' + valor.toLocaleString('es-CL');
}

function getSelection() {
  return JSON.parse(localStorage.getItem('gasVolcanSelection') || '[]');
}

function saveSelection(selection) {
  localStorage.setItem('gasVolcanSelection', JSON.stringify(selection));
  updateSelectionCount();
}

function updateSelectionCount() {
  const count = document.querySelector('#selection-count');
  if (count) count.textContent = getSelection().length;
}

function productCard(product) {
  return `<article class="product-card">
    <img src="${product.imagen}" alt="${product.nombre}">
    <div class="card-body">
      <span class="tag">${product.categoria}</span>
      <h3>${product.nombre}</h3>
      <p>${product.descripcion}</p>
      <p class="price">${dinero(product.precio)}</p>
      <a class="button button-secondary" href="DetalleProducto.html?id=${product.id}">Ver detalle</a>
    </div>
  </article>`;
}

function renderProducts(target) {
  const element = document.querySelector(target);
  if (!element) return;

  let products = getCatalogProducts();
  if (target === '#featured-products') products = products.slice(0, 3);

  element.innerHTML = products.map(productCard).join('');
}

function renderProductDetail() {
  const target = document.querySelector('#product-detail');
  if (!target) return;

  const productId = new URLSearchParams(location.search).get('id');
  const catalogProducts = getCatalogProducts();
  const product = catalogProducts.find(item => String(item.id) === productId) || catalogProducts[0];
  target.innerHTML = `<div class="content-grid">
    <img class="detail-image" src="${product.imagen}" alt="${product.nombre}">
    <div>
      <span class="tag">${product.categoria}</span>
      <h1>${product.nombre}</h1>
      <p class="price">${dinero(product.precio)}</p>
      <p>${product.detalle}</p>
      <button class="button button-primary" data-add-product="${product.id}">Agregar a mi selección</button>
      <p id="selection-message" class="form-message"></p>
    </div>
  </div>`;
}

function renderNews() {
  const target = document.querySelector('#news-list');
  if (!target) return;

  target.innerHTML = novedades.map(item => `<article class="news-card">
    ${item.regalos
      ? `<div class="news-images">
          ${item.regalos.map(regalo => `<img src="${regalo.imagen}" alt="${regalo.nombre}">`).join('')}
        </div>`
      : `<img src="${item.imagen}" alt="${item.titulo}">`}
    <div class="card-body">
      <p class="eyebrow">Gas El Volcán</p>
      <h3>${item.titulo}</h3>
      <p>${item.resumen}</p>
      <a class="text-link" href="NovedadDetalle.html?id=${item.id}">Leer artículo</a>
    </div>
  </article>`).join('');
}

function renderNewsDetail() {
  const target = document.querySelector('#news-detail');
  if (!target) return;

  const itemId = Number(new URLSearchParams(location.search).get('id'));
  const item = novedades.find(entry => entry.id === itemId) || novedades[0];
  let giftOptions = '';

  if (item.regalos) {
    giftOptions = `<section class="gift-promotion">
      <h2>Elige tu regalo</h2>
      <p>En tu primera compra puedes elegir una opción de regalo.</p>
      <div class="gift-options">
        ${item.regalos.map((gift, index) => `<label class="gift-option">
          <input type="radio" name="gift" value="${gift.nombre}" ${index === 0 ? 'checked' : ''}>
          <img src="${gift.imagen}" alt="${gift.nombre}">
          <span>${gift.nombre}</span>
        </label>`).join('')}
      </div>
      <button class="button button-primary" data-select-gift>Elegir este regalo</button>
      <p id="gift-message" class="form-message"></p>
    </section>`;
  }

  const mainImage = item.regalos
    ? `<div class="detail-image detail-gift-images">
        ${item.regalos.map(regalo => `<img src="${regalo.imagen}" alt="${regalo.nombre}">`).join('')}
      </div>`
    : `<img class="detail-image" src="${item.imagen}" alt="${item.titulo}">`;

  target.innerHTML = `${mainImage}
    <p class="eyebrow">Gas El Volcán</p>
    <h1>${item.titulo}</h1>
    <p class="article-copy">${item.detalle}</p>
    ${giftOptions}
    <a class="text-link" href="Novedades.html">Volver a novedades</a>`;
}
function renderSelection() {
  const target = document.querySelector('#selection-list');
  if (!target) return;

  const selected = getSelection();
  target.innerHTML = selected.length
    ? selected.map(item => `<li>
      <span>
        <strong>${item.nombre}</strong>
        <small>${dinero(item.precio)}</small>
      </span>
      <button class="button button-secondary" data-remove-product="${item.id}">Quitar</button>
    </li>`).join('')
    : '<li class="empty-state">Todavía no has agregado cilindros a tu selección.</li>';

  const total = document.querySelector('#selection-total');
  if (total) {
    total.textContent = dinero(selected.reduce((sum, item) => sum + item.precio, 0));
  }
}

function addProduct(id) {
  const product = getCatalogProducts().find(item => String(item.id) === String(id));
  const selection = getSelection();

  if (!selection.some(item => item.id === product.id)) {
    selection.push(product);
    saveSelection(selection);
  }

  renderSelection();
  const message = document.querySelector('#selection-message');
  if (message) {
    message.textContent = 'Producto agregado a tu selección.';
    message.setAttribute('role', 'alert');
    message.className = 'form-message alert alert-success success';
  }
}

function chooseGift() {
  const selectedGift = document.querySelector('input[name="gift"]:checked');
  const message = document.querySelector('#gift-message');

  if (selectedGift && message) {
    message.textContent = `Has elegido: ${selectedGift.value}.`;
    message.setAttribute('role', 'alert');
    message.className = 'form-message success';
  }
}

function giftAlreadyClaimed() {
  return sessionStorage.getItem('gasVolcanGiftClaimed') === 'true';
}

function updatePurchaseGift() {
  const gift = document.querySelector('#purchase-gift');
  const giftNote = document.querySelector('#gift-note');
  if (!gift || !giftNote) return;

  if (giftAlreadyClaimed()) {
    gift.disabled = true;
    gift.value = 'Bolsa de tela';
    giftNote.textContent = 'El regalo solo se puede reclamar en la primera compra de esta sesión.';
    giftNote.className = 'form-message';
  } else {
    gift.disabled = false;
    giftNote.textContent = 'En tu primera compra puedes elegir una bolsa de tela o una alcancía.';
    giftNote.className = 'form-message success';
  }
}

function openPurchasePanel() {
  const selected = getSelection();
  const message = document.querySelector('#purchase-message');
  if (!selected.length) {
    if (message) message.textContent = 'Agrega al menos un producto antes de comprar.';
    return;
  }

  const total = document.querySelector('#purchase-total');
  if (total) {
    total.textContent = dinero(selected.reduce((sum, item) => sum + item.precio, 0));
  }

  updatePurchaseGift();

  if (window.bootstrap) {
    bootstrap.Offcanvas.getOrCreateInstance(document.querySelector('#purchase-offcanvas')).show();
  }
}

function preparePurchaseConfirmation(form) {
  const selected = getSelection();
  const name = form.elements.deliveryName.value.trim();
  const place = form.elements.deliveryPlace.value.trim();
  const card = form.elements.card.value.replace(/\s/g, '');
  const gift = giftAlreadyClaimed() ? 'Sin regalo' : form.elements.gift.value;
  const message = document.querySelector('#purchase-message');

  if (!selected.length) {
    if (message) message.textContent = 'Agrega al menos un producto antes de comprar.';
    return;
  }

  if (!validateName(name) || !place || !/^\d{16}$/.test(card)) {
    if (message) message.textContent = 'El nombre debe tener entre 3 y 300 caracteres, y la tarjeta debe tener 16 dígitos.';
    return;
  }

  document.querySelector('#purchase-confirmation').textContent =
    `${selected.length} producto(s) por ${dinero(selected.reduce((sum, item) => sum + item.precio, 0))}. Entrega para ${name} en ${place}. Regalo: ${gift}.`;
  document.querySelector('#purchase-data').value = JSON.stringify({ name, place, gift });

  if (window.bootstrap) {
    bootstrap.Offcanvas.getOrCreateInstance(document.querySelector('#purchase-offcanvas')).hide();
    bootstrap.Modal.getOrCreateInstance(document.querySelector('#purchase-modal')).show();
  }
}

function finishPurchase() {
  if (!giftAlreadyClaimed()) {
    sessionStorage.setItem('gasVolcanGiftClaimed', 'true');
  }
  localStorage.removeItem('gasVolcanSelection');
  renderSelection();
  updateSelectionCount();

  const notification = document.querySelector('#purchase-notification');
  if (notification) {
    notification.textContent = 'Compra realizada con éxito. Gracias por preferir Gas El Volcán.';
    notification.className = 'purchase-notification success';
  }

  bootstrap.Modal.getOrCreateInstance(document.querySelector('#purchase-modal')).hide();
}
function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePassword(value) {
  return value.length >= 8
    && value.length <= 1000
    && /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/.test(value)
    && /\d/.test(value);
}

function validateName(value) {
  const name = value.trim();
  return name.length >= 3 && name.length <= 300 && /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/.test(name);
}

function setFormMessage(form, text, valid = false) {
  const message = form.querySelector('.form-message');
  if (message) {
    message.textContent = text;
    message.setAttribute('role', 'alert');
    message.className = `form-message alert ${valid ? 'alert-success success' : 'alert-danger error'}`;
  }
}

function clearFieldError(field) {
  if (!field) return;

  field.classList.remove('field-error');
  field.removeAttribute('aria-invalid');
  const error = field.nextElementSibling?.classList.contains('field-error-message')
    ? field.nextElementSibling
    : null;
  if (error) error.remove();
}

function setFieldError(form, fieldName, text) {
  const field = form.elements[fieldName];
  if (!field) return;

  clearFieldError(field);
  field.classList.add('field-error');
  field.setAttribute('aria-invalid', 'true');

  const error = document.createElement('span');
  error.className = 'field-error-message';
  error.setAttribute('role', 'alert');
  error.textContent = text;
  field.insertAdjacentElement('afterend', error);

  setFormMessage(form, 'Revisa el campo indicado para continuar.');
  field.focus();
}

function clearUserFormErrors(form) {
  form.querySelectorAll('.field-error').forEach(clearFieldError);
  const message = form.querySelector('.form-message');
  if (message && message.classList.contains('error')) {
    message.textContent = '';
    message.className = 'form-message';
  }
}

function validateLogin(form) {
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!email || email.length > 100 || !validateEmail(email)) {
    return setFormMessage(form, 'Ingresa un correo válido de máximo 100 caracteres.');
  }

  if (!validatePassword(password)) {
    return setFormMessage(form, 'La contraseña debe tener entre 8 y 1000 caracteres, con al menos una letra y un número.');
  }

  const user = getUsuarios().find(item => item.email === email && item.password === password);
  if (!user) {
    return setFormMessage(form, 'El correo o la contraseña no coinciden con una cuenta de la demo.');
  }

  sessionStorage.setItem('gasVolcanCurrentUser', JSON.stringify(user));
  setFormMessage(form, 'Inicio de sesión correcto. Redirigiendo...', true);
  window.setTimeout(() => {
    window.location.href = user.rol === 'Administrador' ? 'admin.html' : 'InicioPagina.html';
  }, 500);
}
function validateContact(form) {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const comment = form.comment.value.trim();

  if (!validateName(name)) {
    return setFormMessage(form, 'El nombre debe tener entre 3 y 300 caracteres y solo contener letras y espacios.');
  }

  if (email.length > 100 || !validateEmail(email)) {
    return setFormMessage(form, 'Ingresa un correo válido de máximo 100 caracteres.');
  }

  if (!comment || comment.length > 500) {
    return setFormMessage(form, 'El comentario es obligatorio y debe tener máximo 500 caracteres.');
  }

  form.reset();
  setFormMessage(form, 'Consulta enviada correctamente. Te contactaremos pronto.', true);
}

function validarRun(run) {
  const clean = run.replace(/\./g, '').replace(/-/g, '').toUpperCase();
  if (!/^\d{7,8}[0-9K]$/.test(clean)) return false;

  const body = clean.slice(0, -1);
  const verifier = clean.slice(-1);
  let sum = 0;
  let multiplier = 2;

  for (let index = body.length - 1; index >= 0; index -= 1) {
    sum += Number(body[index]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const result = 11 - (sum % 11);
  const expected = result === 11 ? '0' : result === 10 ? 'K' : String(result);
  return verifier === expected;
}

function validateUser(form) {
  clearUserFormErrors(form);

  if (!validarRun(form.run.value)) {
    return setFieldError(form, 'run', 'Ingresa un RUN válido, sin puntos ni guion.');
  }

  if (!validateName(form.name.value)) {
    return setFieldError(form, 'name', 'El nombre debe tener entre 3 y 300 caracteres y solo contener letras y espacios.');
  }

  if (!validateName(form.lastname.value)) {
    return setFieldError(form, 'lastname', 'Los apellidos deben tener entre 3 y 300 caracteres y solo contener letras y espacios.');
  }

  if (!validateEmail(form.email.value) || form.email.value.length > 100) {
    return setFieldError(form, 'email', 'Ingresa un correo válido de máximo 100 caracteres.');
  }

  if (!form.region.value) {
    return setFieldError(form, 'region', 'Selecciona una región.');
  }

  if (!form.commune.value) {
    return setFieldError(form, 'commune', 'Selecciona una comuna.');
  }

  if (!form.address.value.trim() || form.address.value.length > 300) {
    return setFieldError(form, 'address', 'La dirección es obligatoria y debe tener máximo 300 caracteres.');
  }

  if (!validatePassword(form.password.value)) {
    return setFieldError(form, 'password', 'La contraseña debe tener entre 8 y 1000 caracteres, con al menos una letra y un número.');
  }

  const users = getUsuarios();
  const newUser = {
    run: form.run.value.trim().toUpperCase(),
    nombre: form.name.value.trim(),
    apellidos: form.lastname.value.trim(),
    email: form.email.value.trim(),
    rol: form.elements['user-type'].value,
    password: form.password.value
  };

  if (!validateName(newUser.nombre) || !validateName(newUser.apellidos)) {
    return setFieldError(form, 'name', 'El nombre y los apellidos solo deben contener letras y espacios.');
  }

  if (users.some(user => user.run === newUser.run || user.email === newUser.email)) {
    const duplicatedField = users.some(user => user.run === newUser.run) ? 'run' : 'email';
    return setFieldError(form, duplicatedField, 'El RUN o correo ya está registrado en esta sesión.');
  }

  users.push(newUser);
  saveSessionList('gasVolcanUsuarios', users);
  form.reset();
  setFormMessage(form, 'Usuario registrado. Abriendo la lista demo...', true);
  window.setTimeout(() => {
    window.location.href = 'admin-usuarios.html';
  }, 500);
}

function loadRegions() {
  const region = document.querySelector('#region');
  const commune = document.querySelector('#commune');
  if (!region || !commune) return;

  region.innerHTML += Object.keys(regiones)
    .map(item => `<option value="${item}">${item}</option>`)
    .join('');

  region.addEventListener('change', () => {
    const options = regiones[region.value] || [];
    commune.innerHTML = '<option value="">Selecciona una comuna</option>';
    commune.innerHTML += options.map(item => `<option>${item}</option>`).join('');
  });
}

function renderAdminUsers() {
  const target = document.querySelector('#admin-users-list');
  if (!target) return;

  target.innerHTML = getUsuarios().map(user => `<tr>
    <td>${user.nombre} ${user.apellidos}</td>
    <td>${user.email}</td>
    <td>${user.run}</td>
    <td><span class="tag">${user.rol}</span></td>
    <td>
      <button class="button button-secondary" data-edit-user="${user.run}">Editar</button>
      <button class="button button-danger" data-delete-type="user" data-delete-id="${user.run}" data-delete-name="${user.nombre} ${user.apellidos}">Eliminar</button>
    </td>
  </tr>`).join('');
}

function renderAdminProducts() {
  const target = document.querySelector('#admin-products-list');
  if (!target) return;

  target.innerHTML = getProductosAdmin().map(product => `<tr>
    <td>${product.codigo}</td>
    <td>${product.categoria}</td>
    <td>${product.nombre}</td>
     <td>${product.descripcion}</td>
    <td>${product.unidad}</td>
    <td>${dinero(product.precioResidencial)}</td>
    <td>${dinero(product.precioComercial)}</td>
    <td>${product.stock}</td>
    <td>
      <button class="button button-secondary" data-edit-product="${product.codigo}">Editar</button>
      <button class="button button-danger" data-delete-type="product" data-delete-id="${product.codigo}" data-delete-name="${product.nombre}">Eliminar</button>
    </td>
  </tr>`).join('');
}

function fillUserForm(run) {
  const user = getUsuarios().find(item => item.run === run);
  const form = document.querySelector('#user-admin-form');
  if (!user || !form) return;

  form.reset();
  form.elements.run.value = user.run;
  form.elements.name.value = user.nombre;
  form.elements.lastname.value = user.apellidos;
  form.elements.email.value = user.email;
  form.elements.role.value = user.rol;
  form.elements.mode.value = 'edit';
  document.querySelector('#user-offcanvas-title').textContent = 'Editar usuario';
}

function fillProductForm(code) {
  const product = getProductosAdmin().find(item => item.codigo === code);
  const form = document.querySelector('#product-admin-form');
  if (!product || !form) return;

  form.reset();
  form.elements.codigo.value = product.codigo;
  form.elements.categoria.value = product.categoria;
  form.elements.nombre.value = product.nombre;
  form.elements.descripcion.value = product.descripcion;
  form.elements.unidad.value = product.unidad;
  form.elements.precioResidencial.value = product.precioResidencial;
  form.elements.precioComercial.value = product.precioComercial;
  form.elements.stock.value = product.stock;
  form.elements.mode.value = 'edit';
  document.querySelector('#product-offcanvas-title').textContent = 'Editar producto';
}

function openOffcanvas(selector) {
  const element = document.querySelector(selector);
  if (element && window.bootstrap) {
    bootstrap.Offcanvas.getOrCreateInstance(element).show();
  }
}

function openDeleteModal(type, id, name) {
  const form = document.querySelector('#delete-form');
  const message = document.querySelector('#delete-message');
  if (!form || !message) return;

  form.elements.type.value = type;
  form.elements.id.value = id;
  message.textContent = `¿De verdad quieres eliminar ${type === 'user' ? 'al usuario' : 'el producto'} "${name}"?`;
  if (window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance(document.querySelector('#delete-modal')).show();
  }
}

function saveAdminUser(form) {
  const users = getUsuarios();
  const user = {
    run: form.elements.run.value.trim(),
    nombre: form.elements.name.value.trim(),
    apellidos: form.elements.lastname.value.trim(),
    email: form.elements.email.value.trim(),
    rol: form.elements.role.value,
    password: 'Admin1234'
  };

  if (!user.run || !validateName(user.nombre) || !validateName(user.apellidos) || !validateEmail(user.email)) {
    return setFormMessage(form, 'Completa los datos y verifica que nombre y apellidos tengan entre 3 y 300 caracteres.');
  }

  const index = users.findIndex(item => item.run === user.run);
  if (index >= 0) users[index] = user;
  else users.push(user);

  saveSessionList('gasVolcanUsuarios', users);
  renderAdminUsers();
  setFormMessage(form, 'Usuario guardado en esta sesión.', true);
  form.elements.mode.value = 'edit';
}

function saveAdminProduct(form) {
  const products = getProductosAdmin();
  const product = {
    codigo: form.elements.codigo.value.trim().toUpperCase(),
    categoria: form.elements.categoria.value.trim(),
    nombre: form.elements.nombre.value.trim(),
    descripcion: form.elements.descripcion.value.trim(),
    unidad: form.elements.unidad.value.trim(),
    precioResidencial: Number(form.elements.precioResidencial.value),
    precioComercial: Number(form.elements.precioComercial.value),
    stock: Number(form.elements.stock.value)
  };

  if (!product.codigo || !product.categoria || !product.nombre || !product.descripcion || product.precioResidencial < 0 || product.precioComercial < 0 || product.stock < 0) {
    return setFormMessage(form, 'Completa todos los datos del producto con valores válidos.');
  }

  const index = products.findIndex(item => item.codigo === product.codigo);
  if (index >= 0) products[index] = product;
  else products.push(product);

  saveSessionList('gasVolcanProductos', products);
  renderAdminProducts();
  setFormMessage(form, 'Producto guardado en esta sesión.', true);
  form.elements.mode.value = 'edit';
}

function deleteAdminItem(type, id) {
  if (type === 'user') {
    saveSessionList('gasVolcanUsuarios', getUsuarios().filter(user => user.run !== id));
    renderAdminUsers();
  } else {
    saveSessionList('gasVolcanProductos', getProductosAdmin().filter(product => product.codigo !== id));
    renderAdminProducts();
  }
}

document.addEventListener('click', event => {
  const add = event.target.closest('[data-add-product]');
  const remove = event.target.closest('[data-remove-product]');
  const gift = event.target.closest('[data-select-gift]');
  const purchase = event.target.closest('[data-open-purchase]');
  const editUser = event.target.closest('[data-edit-user]');
  const editProduct = event.target.closest('[data-edit-product]');
  const newUser = event.target.closest('[data-new-user]');
  const newProduct = event.target.closest('[data-new-product]');
  const deleteItem = event.target.closest('[data-delete-type]');

  if (add) addProduct(add.dataset.addProduct);

  if (remove) {
    const remaining = getSelection().filter(item => String(item.id) !== String(remove.dataset.removeProduct));
    saveSelection(remaining);
    renderSelection();
  }

  if (gift) chooseGift();
  if (purchase) openPurchasePanel();
  if (editUser) {
    fillUserForm(editUser.dataset.editUser);
    openOffcanvas('#user-offcanvas');
  }
  if (editProduct) {
    fillProductForm(editProduct.dataset.editProduct);
    openOffcanvas('#product-offcanvas');
  }
  if (newUser) {
    const form = document.querySelector('#user-admin-form');
    form.reset();
    form.elements.mode.value = 'new';
    document.querySelector('#user-offcanvas-title').textContent = 'Crear usuario';
    openOffcanvas('#user-offcanvas');
  }
  if (newProduct) {
    const form = document.querySelector('#product-admin-form');
    form.reset();
    form.elements.mode.value = 'new';
    document.querySelector('#product-offcanvas-title').textContent = 'Crear producto';
    openOffcanvas('#product-offcanvas');
  }
  if (deleteItem) {
    openDeleteModal(deleteItem.dataset.deleteType, deleteItem.dataset.deleteId, deleteItem.dataset.deleteName);
  }
});
document.addEventListener('DOMContentLoaded', () => {
  updateSelectionCount();
  renderProducts('#featured-products');
  renderProducts('#catalog-list');
  renderProductDetail();
  renderNews();
  renderNewsDetail();
  renderSelection();
  loadRegions();
  renderAdminUsers();
  renderAdminProducts();

  if (window.bootstrap) {
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(element => {
      bootstrap.Popover.getOrCreateInstance(element);
    });
  }

  const userAdminForm = document.querySelector('#user-admin-form');
  if (userAdminForm) {
    userAdminForm.addEventListener('submit', event => {
      event.preventDefault();
      saveAdminUser(userAdminForm);
    });
  }

  const productAdminForm = document.querySelector('#product-admin-form');
  if (productAdminForm) {
    productAdminForm.addEventListener('submit', event => {
      event.preventDefault();
      saveAdminProduct(productAdminForm);
    });
  }

  const deleteForm = document.querySelector('#delete-form');
  if (deleteForm) {
    deleteForm.addEventListener('submit', event => {
      event.preventDefault();
      deleteAdminItem(deleteForm.elements.type.value, deleteForm.elements.id.value);
      bootstrap.Modal.getOrCreateInstance(document.querySelector('#delete-modal')).hide();
    });
  }

  const purchaseForm = document.querySelector('#purchase-form');
  if (purchaseForm) {
    purchaseForm.addEventListener('submit', event => {
      event.preventDefault();
      preparePurchaseConfirmation(purchaseForm);
    });
  }

  const purchaseConfirmForm = document.querySelector('#purchase-confirm-form');
  if (purchaseConfirmForm) {
    purchaseConfirmForm.addEventListener('submit', event => {
      event.preventDefault();
      finishPurchase();
    });
  }

  const login = document.querySelector('#login-form');
  if (login) {
    login.addEventListener('submit', event => {
      event.preventDefault();
      validateLogin(login);
    });
  }

  const contact = document.querySelector('#contact-form');
  if (contact) {
    contact.addEventListener('submit', event => {
      event.preventDefault();
      validateContact(contact);
    });
  }

  const user = document.querySelector('#user-form');
  if (user) {
    user.querySelectorAll('input, select').forEach(field => {
      field.addEventListener('input', () => {
        clearFieldError(field);
        const message = user.querySelector('.form-message');
        if (message && message.classList.contains('error')) {
          message.textContent = '';
          message.className = 'form-message';
        }
      });
      field.addEventListener('change', () => {
        clearFieldError(field);
        const message = user.querySelector('.form-message');
        if (message && message.classList.contains('error')) {
          message.textContent = '';
          message.className = 'form-message';
        }
      });
    });

    user.addEventListener('submit', event => {
      event.preventDefault();
      validateUser(user);
    });
  }
});
