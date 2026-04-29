const router = require('express').Router();
const authMiddleware = require('../middleware/auth');

// Static quote data (mirrors the GoCompare screenshots)
const quotes = [
  {
    id: 1,
    insurer: 'Allianz',
    tier: 'Online Bronze',
    logo: '/logos/allianz.png',
    rating: 2,
    ratingSource: 'defaqto',
    annualPrice: 1371.34,
    totalExcess: 450,
    voluntaryExcess: 100,
    compulsoryExcess: 350,
    covered: ['Personal accident', 'Windscreen cover', 'Key cover', 'Contents cover'],
    addons: ['Legal assistance', 'Breakdown cover', 'Courtesy car'],
    notCovered: ['Driving abroad cover', 'Misfuelling', 'Personal belongings cover'],
    info: "You can call to claim, everything else you do yourself online. No admin fees. You're in control."
  },
  {
    id: 2,
    insurer: 'Allianz',
    tier: 'Online Silver',
    logo: '/logos/allianz.png',
    rating: 5,
    ratingSource: 'defaqto',
    annualPrice: 1398.65,
    totalExcess: 350,
    voluntaryExcess: 100,
    compulsoryExcess: 250,
    covered: ['Personal accident', 'Courtesy car', 'Windscreen cover', 'Key cover', 'Contents cover'],
    addons: ['Legal assistance', 'Breakdown cover'],
    notCovered: ['Driving abroad cover', 'Misfuelling', 'Personal belongings cover'],
    info: "You can call to claim, everything else you do yourself online. No admin fees. You're in control."
  },
  {
    id: 3,
    insurer: 'Allianz',
    tier: 'Online Gold',
    logo: '/logos/allianz.png',
    rating: 5,
    ratingSource: 'defaqto',
    annualPrice: 1437.46,
    totalExcess: 350,
    voluntaryExcess: 100,
    compulsoryExcess: 250,
    covered: ['Legal assistance', 'Personal accident', 'Courtesy car', 'Windscreen cover', 'Key cover', 'Contents cover'],
    addons: ['Breakdown cover'],
    notCovered: ['Driving abroad cover', 'Misfuelling', 'Personal belongings cover'],
    info: "You can call to claim, everything else you do yourself online. No admin fees. You're in control."
  },
  {
    id: 4,
    insurer: 'Admiral',
    tier: 'Standard',
    logo: '/logos/admiral.png',
    rating: 4,
    ratingSource: 'defaqto',
    annualPrice: 1512.83,
    totalExcess: 175,
    voluntaryExcess: 0,
    compulsoryExcess: 175,
    covered: ['Personal accident', 'Courtesy car', 'Windscreen cover', 'Key cover', 'Contents cover'],
    addons: ['Legal assistance', 'Breakdown cover'],
    notCovered: ['Driving abroad cover', 'Misfuelling'],
    info: "No admin fees for making changes to your policy. Excludes cancellation fees."
  },
  {
    id: 5,
    insurer: 'Elephant',
    tier: 'Standard',
    logo: '/logos/elephant.png',
    rating: 4,
    ratingSource: 'defaqto',
    annualPrice: 1527.96,
    totalExcess: 175,
    voluntaryExcess: 0,
    compulsoryExcess: 175,
    covered: ['Personal accident', 'Courtesy car', 'Windscreen cover'],
    addons: ['Legal assistance', 'Breakdown cover'],
    notCovered: ['Driving abroad cover', 'Misfuelling', 'Personal belongings cover'],
    info: "No admin fees for making changes to your policy."
  },
  {
    id: 6,
    insurer: 'Admiral',
    tier: 'Gold',
    logo: '/logos/admiral.png',
    rating: 5,
    ratingSource: 'defaqto',
    annualPrice: 1537.34,
    totalExcess: 175,
    voluntaryExcess: 0,
    compulsoryExcess: 175,
    covered: ['Legal assistance', 'Personal accident', 'Courtesy car', 'Windscreen cover', 'Key cover', 'Contents cover'],
    addons: ['Breakdown cover'],
    notCovered: ['Driving abroad cover', 'Misfuelling'],
    info: "No admin fees for making changes to your policy. Excludes cancellation fees."
  },
  {
    id: 7,
    insurer: 'Diamond',
    tier: 'Standard',
    logo: '/logos/diamond.png',
    rating: 4,
    ratingSource: 'defaqto',
    annualPrice: 1543.09,
    totalExcess: 175,
    voluntaryExcess: 0,
    compulsoryExcess: 175,
    covered: ['Personal accident', 'Courtesy car', 'Windscreen cover'],
    addons: ['Legal assistance', 'Breakdown cover'],
    notCovered: ['Driving abroad cover', 'Misfuelling', 'Personal belongings cover'],
    info: "No admin fees for making changes to your policy."
  }
];

router.get('/', (req, res) => {
  res.json({ quotes, total: quotes.length });
});

router.get('/:id', (req, res) => {
  const q = quotes.find(q => q.id === parseInt(req.params.id));
  if (!q) return res.status(404).json({ message: 'Quote not found' });
  res.json(q);
});

module.exports = router;
