const router = require('express').Router();

const ALL_QUOTES = [
  {
    id: 1, insurer: 'Allianz', tier: 'Online Bronze', logo: '/logos/allianz-logo.svg', rating: 2, ratingSource: 'defaqto',
    annualPrice: 1371.34, totalExcess: 450, voluntaryExcess: 100, compulsoryExcess: 350,
    covered: ['Personal accident', 'Windscreen cover', 'Key cover', 'Contents cover'],
    addons: ['Legal assistance', 'Breakdown cover', 'Courtesy car'],
    notCovered: ['Driving abroad cover', 'Misfuelling', 'Personal belongings cover'],
    info: "Online-focused policy with claims support via phone."
  },
  {
    id: 2, insurer: 'Allianz', tier: 'Online Silver', logo: '/logos/allianz-logo.svg', rating: 5, ratingSource: 'defaqto',
    annualPrice: 1398.65, totalExcess: 350, voluntaryExcess: 100, compulsoryExcess: 250,
    covered: ['Personal accident', 'Courtesy car', 'Windscreen cover', 'Key cover', 'Contents cover'],
    addons: ['Legal assistance', 'Breakdown cover'],
    notCovered: ['Driving abroad cover', 'Misfuelling', 'Personal belongings cover'],
    info: "Higher Defaqto rating with reduced compulsory excess."
  },
  {
    id: 3, insurer: 'Allianz', tier: 'Online Gold', logo: '/logos/allianz-logo.svg', rating: 5, ratingSource: 'defaqto',
    annualPrice: 1437.46, totalExcess: 350, voluntaryExcess: 100, compulsoryExcess: 250,
    covered: ['Legal assistance', 'Personal accident', 'Courtesy car', 'Windscreen cover', 'Key cover', 'Contents cover'],
    addons: ['Breakdown cover'],
    notCovered: ['Driving abroad cover', 'Misfuelling', 'Personal belongings cover'],
    info: "Premium tier with Legal Assistance included as standard."
  },
  {
    id: 4, insurer: 'Admiral', tier: 'Standard', logo: '/logos/admiral-logo.svg', rating: 4, ratingSource: 'defaqto',
    annualPrice: 1512.83, totalExcess: 175, voluntaryExcess: 0, compulsoryExcess: 175,
    covered: ['Personal accident', 'Courtesy car', 'Windscreen cover', 'Key cover', 'Contents cover'],
    addons: ['Legal assistance', 'Breakdown cover'],
    notCovered: ['Driving abroad cover', 'Misfuelling'],
    info: "No admin fees for policy changes. Market leader in reliability."
  },
  {
    id: 5, insurer: 'Elephant', tier: 'Standard', logo: '/logos/elephant-logo.png', rating: 4, ratingSource: 'defaqto',
    annualPrice: 1527.96, totalExcess: 175, voluntaryExcess: 0, compulsoryExcess: 175,
    covered: ['Personal accident', 'Courtesy car', 'Windscreen cover'],
    addons: ['Legal assistance', 'Breakdown cover'],
    notCovered: ['Driving abroad cover', 'Misfuelling', 'Personal belongings cover'],
    info: "Simple, efficient comprehensive cover."
  },
  {
    id: 6, insurer: 'Admiral', tier: 'Gold', logo: '/logos/admiral-logo.svg', rating: 5, ratingSource: 'defaqto',
    annualPrice: 1537.34, totalExcess: 175, voluntaryExcess: 0, compulsoryExcess: 175,
    covered: ['Legal assistance', 'Personal accident', 'Courtesy car', 'Windscreen cover', 'Key cover', 'Contents cover'],
    addons: ['Breakdown cover'],
    notCovered: ['Driving abroad cover', 'Misfuelling'],
    info: "Admiral's highest protection tier with enhanced benefits."
  },
  {
    id: 7, insurer: 'Diamond', tier: 'Standard', logo: '/logos/diamond-logo.jpg', rating: 4, ratingSource: 'defaqto',
    annualPrice: 1543.09, totalExcess: 175, voluntaryExcess: 0, compulsoryExcess: 175,
    covered: ['Personal accident', 'Courtesy car', 'Windscreen cover'],
    addons: ['Legal assistance', 'Breakdown cover'],
    notCovered: ['Driving abroad cover', 'Misfuelling', 'Personal belongings cover'],
    info: "Tailored for specific driver profiles with high satisfaction."
  },
  {
    id: 8, insurer: 'Hastings Direct', tier: 'YouDrive', logo: '/logos/hasting-direct-logo.png', rating: 3, ratingSource: 'defaqto',
    annualPrice: 1555.20, totalExcess: 250, voluntaryExcess: 100, compulsoryExcess: 150,
    covered: ['Windscreen cover', 'Personal accident'],
    addons: ['Legal assistance', 'Courtesy car'],
    notCovered: ['Key cover', 'Breakdown cover'],
    info: "Smart telematics policy—perfect for safe drivers."
  },
  {
    id: 9, insurer: 'Hastings Direct', tier: 'Essential', logo: '/logos/hasting-direct-logo.png', rating: 3, ratingSource: 'defaqto',
    annualPrice: 1580.50, totalExcess: 300, voluntaryExcess: 150, compulsoryExcess: 150,
    covered: ['Windscreen cover', 'Courtesy car'],
    addons: ['Personal accident', 'Legal assistance'],
    notCovered: ['Key cover'],
    info: "No-frills comprehensive insurance at a competitive price."
  },
  {
    id: 10, insurer: 'Hastings Premier', tier: 'Comprehensive', logo: '/logos/hasting-premier-logo.png', rating: 5, ratingSource: 'defaqto',
    annualPrice: 1610.15, totalExcess: 250, voluntaryExcess: 100, compulsoryExcess: 150,
    covered: ['Legal assistance', 'Windscreen cover', 'Key cover', 'Courtesy car'],
    addons: ['Breakdown cover'],
    notCovered: [],
    info: "Top-tier Hastings cover with all standard features included."
  },
  {
    id: 11, insurer: 'Aviva Online', tier: 'Premium', logo: '/logos/aviva-logo.svg', rating: 5, ratingSource: 'defaqto',
    annualPrice: 1625.00, totalExcess: 400, voluntaryExcess: 250, compulsoryExcess: 150,
    covered: ['Legal assistance', 'Personal accident', 'Windscreen cover', 'New car replacement'],
    addons: ['Foreign use extension'],
    notCovered: ['Key cover'],
    info: "Managed entirely through the Aviva app."
  },
  {
    id: 12, insurer: 'Quotemehappy.com', tier: 'Essentials', logo: '/logos/quote-me-happy-logo.png', rating: 3, ratingSource: 'defaqto',
    annualPrice: 1638.45, totalExcess: 500, voluntaryExcess: 250, compulsoryExcess: 250,
    covered: ['Windscreen cover', 'Courtesy car'],
    addons: ['Personal accident'],
    notCovered: ['Legal assistance'],
    info: "Digital-only brand powered by Aviva."
  },
  {
    id: 13, insurer: 'Churchill', tier: 'Standard', logo: '/logos/churchill-logo.png', rating: 4, ratingSource: 'defaqto',
    annualPrice: 1655.30, totalExcess: 200, voluntaryExcess: 0, compulsoryExcess: 200,
    covered: ['Courtesy car', 'Windscreen cover', 'Personal accident'],
    addons: ['Breakdown cover', 'Legal assistance'],
    notCovered: ['Misfuelling'],
    info: "Reliable cover with the famous Churchill guarantee."
  },
  {
    id: 14, insurer: 'Churchill', tier: 'Plus', logo: '/logos/churchill-logo.png', rating: 5, ratingSource: 'defaqto',
    annualPrice: 1689.90, totalExcess: 150, voluntaryExcess: 0, compulsoryExcess: 150,
    covered: ['Legal assistance', 'Courtesy car', 'Windscreen cover', 'Key cover'],
    addons: ['Breakdown cover'],
    notCovered: [],
    info: "Enhanced protection limits and low excess."
  },
  {
    id: 15, insurer: 'Privilege', tier: 'Standard', logo: '/logos/privilege-logo.png', rating: 4, ratingSource: 'defaqto',
    annualPrice: 1695.00, totalExcess: 250, voluntaryExcess: 100, compulsoryExcess: 150,
    covered: ['Windscreen cover', 'Personal accident', 'Courtesy car'],
    addons: ['Legal assistance'],
    notCovered: ['Driving abroad'],
    info: "Competitive rates for low-risk drivers."
  },
  {
    id: 16, insurer: 'LV=', tier: 'Standard', logo: '/logos/lv-logo.jpg', rating: 5, ratingSource: 'defaqto',
    annualPrice: 1710.20, totalExcess: 300, voluntaryExcess: 150, compulsoryExcess: 150,
    covered: ['Windscreen cover', 'Courtesy car', 'Legal assistance'],
    addons: ['Breakdown cover'],
    notCovered: ['Misfuelling'],
    info: "Highly rated for customer service and claims handling."
  },
  {
    id: 17, insurer: 'AXA', tier: 'Plus', logo: '/logos/axa-logo.png', rating: 4, ratingSource: 'defaqto',
    annualPrice: 1725.50, totalExcess: 350, voluntaryExcess: 200, compulsoryExcess: 150,
    covered: ['Windscreen cover', 'Key cover', 'Personal accident'],
    addons: ['Courtesy car', 'Legal assistance'],
    notCovered: ['Driving abroad'],
    info: "Global insurance giant with massive UK support."
  },
  {
    id: 18, insurer: 'Direct Line', tier: 'Comprehensive', logo: '/logos/direct-line-logo.png', rating: 5, ratingSource: 'defaqto',
    annualPrice: 1740.00, totalExcess: 250, voluntaryExcess: 100, compulsoryExcess: 150,
    covered: ['Courtesy car', 'Windscreen cover', 'Personal accident', 'Legal assistance'],
    addons: ['Breakdown cover'],
    notCovered: [],
    info: "The flagship for direct car insurance in the UK."
  },
  {
    id: 19, insurer: '1st Central', tier: 'Value', logo: '/logos/1stCentral-logo.png', rating: 2, ratingSource: 'defaqto',
    annualPrice: 1755.99, totalExcess: 550, voluntaryExcess: 300, compulsoryExcess: 250,
    covered: ['Windscreen cover'],
    addons: ['Courtesy car', 'Legal assistance'],
    notCovered: ['Personal accident', 'Key cover'],
    info: "Entry-level cover with a higher excess for lower monthly costs."
  },
  {
    id: 20, insurer: '1st Central', tier: 'Standard', logo: '/logos/1stCentral-logo.png', rating: 4, ratingSource: 'defaqto',
    annualPrice: 1780.40, totalExcess: 450, voluntaryExcess: 250, compulsoryExcess: 200,
    covered: ['Windscreen cover', 'Key cover', 'Courtesy car'],
    addons: ['Legal assistance'],
    notCovered: ['Driving abroad'],
    info: "Solid mid-range cover from a popular broker."
  },
  {
    id: 21, insurer: 'More Than', tier: 'Primary', logo: '/logos/more-than-logo.jpg', rating: 4, ratingSource: 'defaqto',
    annualPrice: 1795.10, totalExcess: 300, voluntaryExcess: 150, compulsoryExcess: 150,
    covered: ['Windscreen cover', 'Courtesy car'],
    addons: ['Personal accident', 'Legal assistance'],
    notCovered: ['Misfuelling'],
    info: "Simple claims process and digital-first support."
  },
  {
    id: 22, insurer: 'Sheilas Wheels', tier: 'Standard', logo: '/logos/sw-logo.jpg', rating: 4, ratingSource: 'defaqto',
    annualPrice: 1810.00, totalExcess: 250, voluntaryExcess: 100, compulsoryExcess: 150,
    covered: ['Windscreen cover', 'Personal accident', 'Courtesy car'],
    addons: ['Legal assistance'],
    notCovered: ['Key cover'],
    info: "Well-known brand with high customer loyalty."
  },
  {
    id: 23, insurer: 'Co-op Insurance', tier: 'Eco-Share', logo: '/logos/co-op-logo.png', rating: 3, ratingSource: 'defaqto',
    annualPrice: 1830.25, totalExcess: 350, voluntaryExcess: 200, compulsoryExcess: 150,
    covered: ['Windscreen cover', 'Personal accident'],
    addons: ['Courtesy car'],
    notCovered: ['Legal assistance'],
    info: "Insurance with a community and ethical focus."
  },
  {
    id: 24, insurer: 'Ageas', tier: 'Essentials', logo: '/logos/ageas-logo.jpg', rating: 3, ratingSource: 'defaqto',
    annualPrice: 1845.60, totalExcess: 400, voluntaryExcess: 200, compulsoryExcess: 200,
    covered: ['Windscreen cover', 'Key cover'],
    addons: ['Courtesy car'],
    notCovered: ['Legal assistance', 'Personal belongings'],
    info: "Award-winning claims service at a budget price."
  },
  {
    id: 25, insurer: 'Tesco Bank', tier: 'Standard', logo: '/logos/tesco-bank.png', rating: 4, ratingSource: 'defaqto',
    annualPrice: 1860.00, totalExcess: 250, voluntaryExcess: 125, compulsoryExcess: 125,
    covered: ['Windscreen cover', 'Courtesy car'],
    addons: ['Legal assistance', 'Breakdown cover'],
    notCovered: ['Driving abroad'],
    info: "Extra benefits available for Clubcard members."
  },
  {
    id: 26, insurer: 'Saga', tier: 'Select', logo: '/logos/saga-logo.jpg', rating: 5, ratingSource: 'defaqto',
    annualPrice: 1885.40, totalExcess: 200, voluntaryExcess: 0, compulsoryExcess: 200,
    covered: ['Legal assistance', 'Windscreen cover', 'Courtesy car', 'Medical expenses'],
    addons: ['Breakdown cover'],
    notCovered: [],
    info: "Specialist insurance designed for the over 50s."
  },
  {
    id: 27, insurer: 'Flow', tier: 'Monthly', logo: '/logos/flow-logo.png', rating: 4, ratingSource: 'defaqto',
    annualPrice: 1910.00, totalExcess: 300, voluntaryExcess: 150, compulsoryExcess: 150,
    covered: ['Windscreen cover', 'Key cover'],
    addons: ['Courtesy car'],
    notCovered: ['Legal assistance'],
    info: "Subscription-style insurance for modern lifestyles."
  },
  {
    id: 28, insurer: 'General Accident', tier: 'Telematics', logo: '/logos/general-accident-logo.jpg', rating: 3, ratingSource: 'defaqto',
    annualPrice: 1925.75, totalExcess: 450, voluntaryExcess: 250, compulsoryExcess: 200,
    covered: ['Windscreen cover', 'Personal accident'],
    addons: ['Legal assistance'],
    notCovered: ['Key cover'],
    info: "Heritage brand offering modern black-box policies."
  },
  {
    id: 29, insurer: 'Esure', tier: 'Standard', logo: '/logos/esure-logo.png', rating: 4, ratingSource: 'defaqto',
    annualPrice: 1940.20, totalExcess: 300, voluntaryExcess: 150, compulsoryExcess: 150,
    covered: ['Windscreen cover', 'Courtesy car', 'Key cover'],
    addons: ['Legal assistance'],
    notCovered: ['Misfuelling'],
    info: "Reliable and straightforward comprehensive cover."
  },
  {
    id: 30, insurer: 'NFU Mutual', tier: 'Comprehensive', logo: '/logos/nfu-mutual-logo.png', rating: 5, ratingSource: 'defaqto',
    annualPrice: 1980.50, totalExcess: 100, voluntaryExcess: 0, compulsoryExcess: 100,
    covered: ['Legal assistance', 'Windscreen cover', 'Courtesy car'],
    addons: ['Breakdown cover'],
    notCovered: [],
    info: "Local service with a high-trust mutual model."
  }
];

function parseExcess(str) {
  if (!str || str === 'None') return 0;
  return parseInt(str.replace(/[^0-9]/g, '')) || 0;
}

function applyFilters(quotes, { voluntaryExcess, addons }) {
  const maxVoluntary = parseExcess(voluntaryExcess);
  const requiredAddons = Object.entries(addons || {})
    .filter(([, v]) => v)
    .map(([k]) => k);

  return quotes.filter(q => {
    // Voluntary excess filter: "None" means no preference (show all)
    // Otherwise only show quotes where the quote's voluntary excess is <= selected max
    if (maxVoluntary > 0 && q.voluntaryExcess > maxVoluntary) return false;

    // Addon filter: quote must include required addons in covered OR addons list
    if (requiredAddons.length > 0) {
      const allFeatures = [...q.covered, ...q.addons];
      const hasAll = requiredAddons.every(addon => allFeatures.includes(addon));
      if (!hasAll) return false;
    }

    return true;
  });
}

// GET /api/quotes — all 30 sorted by price
router.get('/', (req, res) => {
  const sorted = [...ALL_QUOTES].sort((a, b) => a.annualPrice - b.annualPrice);
  res.json({ quotes: sorted, total: sorted.length });
});

// POST /api/quotes/filter — filtered & sorted
router.post('/filter', (req, res) => {
  const {
    voluntaryExcess = 'None',
    addons = {},
    protectNoClaims = 'No',
    payment = 'Annually',
    coverType = 'Comprehensive'
  } = req.body;

  let filtered = applyFilters(ALL_QUOTES, { voluntaryExcess, addons });
  filtered.sort((a, b) => a.annualPrice - b.annualPrice);

  res.json({ quotes: filtered, total: filtered.length });
});

// GET /api/quotes/:id
router.get('/:id', (req, res) => {
  const q = ALL_QUOTES.find(q => q.id === parseInt(req.params.id));
  if (!q) return res.status(404).json({ message: 'Quote not found' });
  res.json(q);
});

module.exports = router;
