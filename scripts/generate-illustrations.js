/* Creates the 51 text-free, local SVG food illustrations used by the static guide. */
const fs = require('fs');
const path = require('path');
const slugs = `beef-noodle lu-rou-fan chicken-rice xiaolongbao pepper-bun oyster-omelet three-cup-chicken pork-chop-rice potstickers stinky-tofu intestine-vermicelli fish-ball-soup pork-ball-soup meatball rice-pudding fried-chicken chicken-cutlet sausage-rice taiwan-sausage sweet-potato-balls turnip-cake scallion-pancake egg-cake sticky-rice-sausage peanut-ice-cream-roll fried-squid oyster-vermicelli tempura oden grilled-corn mango-ice snow-ice tofu-pudding taro-balls grass-jelly aiyu-jelly eight-treasure-ice pineapple-cake sun-cake mochi sesame-tangyuan bubble-milk-tea four-seasons-tea high-mountain-tea winter-melon-tea plum-juice lemon-aiyu papaya-milk watermelon-juice rice-milk savory-soy-milk`.split(' ');
const drink = new Set(slugs.slice(41));
const sweet = new Set(slugs.slice(30, 41));
const fried = new Set(slugs.slice(15, 30));
const meals = new Set(slugs.slice(0, 15));
const palettes = [
  ['#f9d8d3','#e9756a','#773e3d','#ffe7b3'], ['#d7eadf','#6eb6a2','#42665f','#fff0c9'],
  ['#ddd3ef','#8d6eaf','#503d67','#ffe5b4'], ['#f9e8bb','#e8a64d','#714533','#ffeef0'],
  ['#cfe5e8','#4f9398','#315d62','#ffd6ca'], ['#f4d4df','#d66a86','#783c50','#fff0bc']
];
function hash(s){ return [...s].reduce((a,c)=>((a*31+c.charCodeAt(0))>>>0),7); }
function svg(slug, i) {
  const p = palettes[hash(slug)%palettes.length], n = hash(slug), isDrink=drink.has(slug), isSweet=sweet.has(slug), isFried=fried.has(slug), isMeal=meals.has(slug);
  const dots = Array.from({length:5},(_,j)=>`<circle cx="${38+((n>>j)%160)}" cy="${35+((n>>(j+4))%105)}" r="${3+(j%3)}" fill="${p[3]}" opacity=".7"/>`).join('');
  let food;
  if(isDrink) food=`<path d="M103 43h94l-9 166c-1 17-75 17-76 0z" fill="#fff9ed" stroke="${p[2]}" stroke-width="5"/><path d="M111 118h78l-5 82c-2 11-63 11-65 0z" fill="${p[1]}"/><path d="M131 39l42 87" stroke="${p[2]}" stroke-width="7" stroke-linecap="round"/><circle cx="133" cy="161" r="9" fill="${p[3]}"/><circle cx="166" cy="180" r="10" fill="${p[3]}"/><circle cx="150" cy="139" r="8" fill="${p[3]}"/>`;
  else if(isSweet) food=`<ellipse cx="150" cy="190" rx="91" ry="34" fill="#fff9ed" stroke="${p[2]}" stroke-width="5"/><path d="M69 175q17-104 81-104t81 104" fill="${p[0]}" stroke="${p[2]}" stroke-width="5"/><path d="M91 153q58-70 118 0" fill="none" stroke="#fff8ee" stroke-width="17" stroke-linecap="round"/><circle cx="115" cy="131" r="17" fill="${p[3]}"/><circle cx="157" cy="111" r="15" fill="${p[1]}"/><circle cx="189" cy="139" r="18" fill="${p[3]}"/><path d="M145 58q7-21 0-37M169 62q10-22 7-39" stroke="${p[2]}" stroke-width="5" stroke-linecap="round" opacity=".6"/>`;
  else if(isFried) food=`<path d="M80 203l15-128q56-29 111 0l16 128q-66 40-142 0z" fill="#fff7e9" stroke="${p[2]}" stroke-width="5"/><path d="M93 92q57-32 101 0l15 96q-59 29-116 0z" fill="${p[0]}"/><g fill="${p[1]}" stroke="${p[2]}" stroke-width="3"><circle cx="120" cy="120" r="19"/><circle cx="159" cy="111" r="22"/><circle cx="181" cy="146" r="18"/><circle cx="136" cy="159" r="23"/><circle cx="104" cy="154" r="15"/></g><path d="M76 78q70-45 148 0" fill="none" stroke="${p[3]}" stroke-width="8" stroke-linecap="round"/>`;
  else if(isMeal) food=`<ellipse cx="150" cy="196" rx="99" ry="35" fill="#fff9ed" stroke="${p[2]}" stroke-width="5"/><path d="M57 157q12 60 93 60t93-60" fill="${p[0]}" stroke="${p[2]}" stroke-width="5"/><ellipse cx="150" cy="157" rx="93" ry="42" fill="${p[3]}"/><path d="M92 149q19-33 43 0t44 0t35 0" fill="none" stroke="${p[1]}" stroke-width="8" stroke-linecap="round"/><path d="M107 129q-9-22 1-39M152 125q-8-25 3-46M190 133q-3-23 10-39" stroke="${p[2]}" stroke-width="5" stroke-linecap="round" opacity=".65"/>`;
  else food='';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 260" role="img"><rect width="300" height="260" rx="24" fill="${p[0]}"/>${dots}<path d="M24 229q126-20 252 0" fill="none" stroke="${p[2]}" stroke-width="3" opacity=".22"/>${food}<path d="M26 33q15-15 30 0M244 40q14-14 29 0" fill="none" stroke="${p[2]}" stroke-width="4" stroke-linecap="round" opacity=".35"/></svg>`;
}
const target = path.join(__dirname, '..', 'img');
fs.mkdirSync(target, {recursive:true});
slugs.forEach((slug,i) => fs.writeFileSync(path.join(target, `${slug}.svg`), svg(slug,i), 'utf8'));
console.log(`Created ${slugs.length} SVG illustrations in ${target}`);
