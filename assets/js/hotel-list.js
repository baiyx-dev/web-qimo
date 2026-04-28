const hotels = [
  {
    id: "bw",
    name: "B&W 海岸隐奢度假酒店",
    city: "海岸度假区",
    address: "陕西理工大学 B13号",
    price: 1680,
    score: 4.9,
    image: "assets/images/hotels/bw/space-villa.jpg",
    tags: ["海景", "疗愈", "隐奢"],
    features: ["私享别墅", "海景客厅", "疗愈仪式"],
    description: "以海岸、光影与静谧共同塑造的度假酒店，也是当前项目已经完成的酒店详情页。",
    url: "pages/hotel-bw.html"
  },
  {
    id: "city",
    name: "Aurelle Bay Hotel 奥瑞尔海湾酒店",
    city: "海南·陵水",
    address: "月湾大道 88 号",
    price: 1460,
    score: 4.8,
    image: "assets/images/hotels/aurelle/hero-exterior.png",
    tags: ["海景", "疗愈", "轻奢"],
    features: ["270°海景客房", "悬崖无边泳池", "日落观景露台"],
    description: "位于海南陵水海岸线的高端海滨度假酒店，以白色建筑、无边泳池和日落海景为核心体验。",
    url: "pages/hotel-aurelle.html"
  },
  {
    id: "nexora",
    name: "NEXORA SKYLINE HOTEL 奈索拉云境酒店",
    city: "上海·陆家嘴",
    address: "世纪大道 1000 号",
    price: 1880,
    score: 4.86,
    image: "assets/images/hotels/nexora/hero-exterior.png",
    tags: ["城市", "科技", "夜景"],
    features: ["AI智能控制", "空中观景酒吧", "数字艺术长廊"],
    description: "位于上海金融核心区的未来科技感城市地标酒店，以 AI 智能、镜面空间和霓虹光影构成沉浸体验。",
    url: "pages/hotel-nexora.html"
  },
  {
    id: "sylvara",
    name: "SYLVARA FOREST RETREAT 西尔瓦森林秘境酒店",
    city: "云南·香格里拉",
    address: "秘林谷 66 号",
    price: 1580,
    score: 4.88,
    image: "assets/images/hotels/sylvara/hero-exterior.png",
    tags: ["森林", "疗愈", "自然"],
    features: ["隐入式木屋", "森林温泉", "悬空木栈道"],
    description: "隐入原始森林深处的高端自然疗愈度假酒店，以木材、石材、玻璃和薄雾光束营造秘境体验。",
    url: "pages/hotel-sylvara.html"
  }
];

const hotelGrid = document.getElementById("hotelGrid");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const keywordInput = document.getElementById("keywordInput");
const priceSelect = document.getElementById("priceSelect");
const sortSelect = document.getElementById("sortSelect");
const filterForm = document.getElementById("filters");
const tagButtons = [...document.querySelectorAll(".tag-filter")];

let activeTag = "all";

function getFilteredHotels() {
  const keyword = keywordInput.value.trim().toLowerCase();
  const [minPrice, maxPrice] =
    priceSelect.value === "all"
      ? [0, Number.POSITIVE_INFINITY]
      : priceSelect.value.split("-").map(Number);

  const filtered = hotels.filter((hotel) => {
    const content = [
      hotel.name,
      hotel.city,
      hotel.address,
      hotel.description,
      ...hotel.tags,
      ...hotel.features
    ]
      .join(" ")
      .toLowerCase();
    const matchKeyword = !keyword || content.includes(keyword);
    const matchPrice = hotel.price >= minPrice && hotel.price <= maxPrice;
    const matchTag = activeTag === "all" || hotel.tags.includes(activeTag);
    return matchKeyword && matchPrice && matchTag;
  });

  return filtered.sort((a, b) => {
    if (sortSelect.value === "price-low") return a.price - b.price;
    if (sortSelect.value === "score-high") return b.score - a.score;
    if (a.id === "bw") return -1;
    if (b.id === "bw") return 1;
    return b.score - a.score;
  });
}

function renderHotels() {
  const filteredHotels = getFilteredHotels();
  hotelGrid.innerHTML = filteredHotels
    .map(
      (hotel) => `
        <article class="hotel-card">
          <a class="hotel-cover" href="${hotel.url || "#hotels"}" aria-label="查看${hotel.name}">
            <img src="${hotel.image}" alt="${hotel.name}" />
          </a>
          <div class="hotel-info">
            <div class="hotel-meta">
              <span>${hotel.city}</span>
              <span>${hotel.address}</span>
            </div>
            <h3>${hotel.name}</h3>
            <p>${hotel.description}</p>
            <div class="hotel-tags">
              ${hotel.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <div class="hotel-feature">
              ${hotel.features.map((feature) => `<span>${feature}</span>`).join("")}
            </div>
          </div>
          <div class="hotel-action">
            <div>
              <span class="score">${hotel.score.toFixed(1)}</span>
              <div class="price">¥${hotel.price}<small> 起/晚</small></div>
            </div>
            <a class="detail-link ${hotel.url ? "" : "is-muted"}" href="${hotel.url || "#hotels"}">
              ${hotel.url ? "查看详情" : "待接入"}
            </a>
          </div>
        </article>
      `
    )
    .join("");

  resultCount.textContent = `共找到 ${filteredHotels.length} 家酒店`;
  emptyState.classList.toggle("is-visible", filteredHotels.length === 0);
}

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderHotels();
});

[keywordInput, priceSelect, sortSelect].forEach((control) => {
  control.addEventListener("input", renderHotels);
  control.addEventListener("change", renderHotels);
});

tagButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeTag = button.dataset.tag;
    tagButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderHotels();
  });
});

renderHotels();
