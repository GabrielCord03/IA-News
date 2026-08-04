/* Authored line-icon set, one stroke family, field-log register. No emoji, no icon-font. */
const ICONS = {
  modelos:
    '<circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><circle cx="12" cy="6.2" r="2.4"/><line x1="8.5" y1="15.6" x2="10.7" y2="8.1"/><line x1="15.5" y1="15.6" x2="13.3" y2="8.1"/><line x1="9" y1="17" x2="15" y2="17"/>',
  ferramentas_plugins_mcps:
    '<path d="M9 3v5M15 3v5"/><path d="M7 8h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V8Z"/><path d="M12 16v5"/>',
  open_source:
    '<path d="M12 21V11"/><path d="M12 11C12 7 9 5 5 5c0 4 3 7 7 6.2"/><path d="M12 14c0-3 3-5 7-5 0 3.5-3 6-7 5.4"/>',
  discussoes:
    '<path d="M4 5.5h16V15H9.2L5 18.5V15H4V5.5Z"/><line x1="7.5" y1="10.2" x2="16.5" y2="10.2"/>',
  papers:
    '<path d="M7 3h7l4 4v14H7V3Z"/><path d="M14 3v4h4"/><line x1="9.3" y1="11.5" x2="15.5" y2="11.5"/><line x1="9.3" y1="14.5" x2="15.5" y2="14.5"/><line x1="9.3" y1="17.5" x2="13" y2="17.5"/>',
  mercado:
    '<polyline points="4,17 9.5,10.8 13,13.6 20,6"/><circle cx="20" cy="6" r="1.3" fill="currentColor" stroke="none"/><polyline points="4,20 20,20" opacity=".5"/>',
  regulacao:
    '<line x1="12" y1="4" x2="12" y2="19"/><line x1="6" y1="7" x2="18" y2="7"/><path d="M3.5 12.5l3-5.5 3 5.5a3 2.4 0 0 1-6 0Z"/><path d="M14.5 12.5l3-5.5 3 5.5a3 2.4 0 0 1-6 0Z"/><line x1="8" y1="20" x2="16" y2="20"/>',
  integracoes_novas:
    '<rect x="3" y="9" width="10" height="6" rx="3"/><rect x="11" y="9" width="10" height="6" rx="3" fill="none"/>',
  dicas_economia_e_performance:
    '<circle cx="12" cy="12" r="8"/><path d="M9.3 9.8c0-1.4 1.2-2.3 2.7-2.3s2.7.9 2.7 2c0 1.3-1.2 1.9-2.7 2.4-1.5.5-2.7 1.1-2.7 2.4 0 1.1 1.2 2 2.7 2s2.7-.9 2.7-2.3"/><line x1="12" y1="6" x2="12" y2="7.5"/><line x1="12" y1="16.5" x2="12" y2="18"/>',
  dicas_programadores:
    '<polyline points="8.5,7.5 4,12 8.5,16.5"/><polyline points="15.5,7.5 20,12 15.5,16.5"/><line x1="13.2" y1="5.7" x2="10.8" y2="18.3"/>',
  delphi_e_ia:
    '<circle cx="12" cy="12" r="8.2"/><path d="M15.2 8.8l-2.1 5-5 2.1 2.1-5 5-2.1Z" fill="currentColor" stroke="none"/>',
  comparativos_modelos:
    '<circle cx="9.3" cy="12" r="6"/><circle cx="14.7" cy="12" r="6" fill="none"/>',
  book:
    '<path d="M4 5.7C4 4.8 4.7 4 5.7 4H12v16H5.7A1.7 1.7 0 0 1 4 18.3V5.7Z"/><path d="M20 5.7c0-.9-.7-1.7-1.7-1.7H12v16h6.3c.9 0 1.7-.8 1.7-1.7V5.7Z"/>',
  search:
    '<circle cx="10.3" cy="10.3" r="6.3"/><line x1="15.2" y1="15.2" x2="21" y2="21"/>',
  sun:
    '<circle cx="12" cy="12" r="3.6"/><line x1="12" y1="2.5" x2="12" y2="5.2"/><line x1="12" y1="18.8" x2="12" y2="21.5"/><line x1="4.5" y1="4.5" x2="6.4" y2="6.4"/><line x1="17.6" y1="17.6" x2="19.5" y2="19.5"/><line x1="2.5" y1="12" x2="5.2" y2="12"/><line x1="18.8" y1="12" x2="21.5" y2="12"/><line x1="4.5" y1="19.5" x2="6.4" y2="17.6"/><line x1="17.6" y1="6.4" x2="19.5" y2="4.5"/>',
  moon:
    '<path d="M20 14.6A8.6 8.6 0 1 1 9.4 4a7.1 7.1 0 0 0 10.6 10.6Z"/>',
  arrow:
    '<line x1="4" y1="12" x2="18.5" y2="12"/><polyline points="13,6.8 18.5,12 13,17.2"/>',
  flag:
    '<line x1="6" y1="3" x2="6" y2="21"/><path d="M6 4.2h11.5l-2.7 4 2.7 4H6"/>',
  sighting:
    '<circle cx="8.4" cy="16.2" r="3.2"/><circle cx="15.6" cy="16.2" r="3.2"/><path d="M9.9 13.4c.3-2.7.8-5.4 1.3-6.5a1 1 0 0 1 1.8 0c.5 1.1 1 3.8 1.3 6.5"/>',
  chevronRight:
    '<polyline points="9,5 16,12 9,19"/>',
  compass:
    '<circle cx="12" cy="12" r="8.2"/><path d="M15.3 8.7l-2.2 5-5 2.2 2.2-5 5-2.2Z"/>',
};

function svgIcon(key, size) {
  const s = size || 20;
  const body = ICONS[key] || ICONS.compass;
  return `<svg class="icon" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
