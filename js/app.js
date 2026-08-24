
(function(){
  const STORAGE_KEY = 'up_pastorale_data_v1';
  const STATUSES = ['Demande','Préparation','Célébration','Clôture'];
  const STATUS_CLASS = { 'Demande':'badge-demande', 'Préparation':'badge-prep', 'Célébration':'badge-celeb', 'Clôture':'badge-cloture' };
  const COLORS = ['#2980b9','#c0392b','#27ae60','#8e44ad','#7f8c8d'];

  const defaultData = [
    { id:1, type:'Baptême', paroisse:'Assomption', nom:'Famille Lavoie', date:'2026-08-30', status:'Préparation', notes:'Premier enfant' },
    { id:2, type:'Mariage', paroisse:'Saint-Georges', nom:'Marie & Jean', date:'2026-09-15', status:'Demande', notes:'Cérémonie à 14h' },
    { id:3, type:'Funéraille', paroisse:'Saint-André', nom:'M. Bernard', date:'2026-08-25', status:'Célébration', notes:'Crémation prévue' },
    { id:4, type:'Catéchèse', paroisse:'Saint-Michel', nom:'Groupe 1er commun.', date:'2026-09-05', status:'Préparation', notes:'12 enfants inscrits' },
    { id:5, type:'Onction des malades', paroisse:'Assomption', nom:'Mme Thibault', date:'2026-08-20', status:'Clôture', notes:'Célébrée le 20 août' },
    { id:6, type:'Baptême', paroisse:'Saint-Georges', nom:'Famille Roy', date:'2026-10-12', status:'Demande', notes:'Jumeaux' },
    { id:7, type:'Groupe de prière', paroisse:'Saint-André', nom:'Chapelet mensuel', date:'2026-08-28', status:'Préparation', notes:'Tous les derniers vendredis' },
    { id:8, type:'Bénévolat', paroisse:'Saint-Michel', nom:'Dîner communautaire', date:'2026-09-10', status:'Demande', notes:'40 bénévoles attendus' }
  ];

  const tracks = [
    { title:'Ave Maria de Lourdes', artist:'Chœur de l\'unité pastorale', dur:'3:24' },
    { title:'Je vous salue Marie', artist:'Ensemble vocal Sacré-Cœur', dur:'2:48' },
    { title:'Salut à Notre-Dame', artist:'Chorale paroissiale', dur:'4:12' },
    { title:'Magnificat', artist:'Schola grégorienne', dur:'5:05' },
    { title:'Regina Caeli', artist:'Petits chanteurs', dur:'2:15' }
  ];

  const videos = [
    { title:'Messe d\'inauguration — Assomption', dur:'1:24:00' },
    { title:'Retraite paroissiale — Été 2026', dur:'45:30' },
    { title:'Baptêmes collectifs — Juin 2026', dur:'32:15' },
    { title:'Mariage de Paul & Sophie', dur:'58:00' },
    { title:'Veillée de Noël — Saint-Georges', dur:'1:10:00' },
    { title:'Confirmation des jeunes', dur:'1:05:00' }
  ];

  // ── Data ──
  function loadData() {
    try { const d = localStorage.getItem(STORAGE_KEY); if(d) return JSON.parse(d); } catch(e){}
    return JSON.parse(JSON.stringify(defaultData));
  }
  function saveData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  let data = loadData();

  // ── Helpers ──
  window.fmtDate = function(d) {
    return new Date(d+'T00:00:00').toLocaleDateString('fr-FR', {day:'numeric', month:'short', year:'numeric'});
  };
  window.fmtDateFull = function(d) {
    return new Date(d+'T00:00:00').toLocaleDateString('fr-FR', {day:'numeric', month:'long', year:'numeric'});
  };

  // ── Mobile menu ──
  window.toggleMenu = function() {
    document.getElementById('mainNav').classList.toggle('open');
  };

  // ── Dashboard ──
  window.renderDash = function() {
    const total = data.length;
    const enCours = data.filter(a => a.status !== 'Clôture').length;
    const now = new Date();
    const ceMois = data.filter(a => { const d = new Date(a.date); return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear(); }).length;
    const parCount = {};
    data.forEach(a => { parCount[a.paroisse] = (parCount[a.paroisse]||0)+1; });
    const topPar = Object.entries(parCount).sort((a,b)=>b[1]-a[1])[0]?.[0] || '-';

    const el = document.getElementById('dashCards');
    if(el) el.innerHTML = `
      <div class="card"><div class="card-title">Total activités</div><div class="card-value">${total}</div><div class="card-delta">Toutes paroisses</div></div>
      <div class="card"><div class="card-title">En cours</div><div class="card-value">${enCours}</div><div class="card-delta">Hors clôture</div></div>
      <div class="card"><div class="card-title">Ce mois</div><div class="card-value">${ceMois}</div><div class="card-delta">${now.toLocaleString('fr-FR',{month:'long',year:'numeric'})}</div></div>
      <div class="card"><div class="card-title">Paroisse active</div><div class="card-value" style="font-size:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${topPar}</div><div class="card-delta">Plus d'activités</div></div>
    `;

    const typeCount = {};
    data.forEach(a => { typeCount[a.type] = (typeCount[a.type]||0)+1; });
    const maxT = Math.max(...Object.values(typeCount),1);
    const byTypeEl = document.getElementById('dashByType');
    if(byTypeEl) byTypeEl.innerHTML = Object.entries(typeCount).map(([k,v],i) => `
      <div class="bar-wrap"><div class="bar-label">${k}</div><div class="bar-track"><div class="bar-fill" style="width:${(v/maxT*100)}%;background:${COLORS[i%COLORS.length]};"></div></div><div class="bar-val">${v}</div></div>
    `).join('');

    const stCount = {};
    STATUSES.forEach(s => stCount[s] = data.filter(a => a.status===s).length);
    const totalSt = data.length || 1;
    let acc = 0;
    const donut = STATUSES.map((s,i) => {
      const v = stCount[s];
      const pct = v/totalSt;
      const start = acc;
      acc += pct;
      return { start, end: acc, count: v, status: s, color: ['#7f8c8d','#2980b9','#27ae60','#27ae60'][i] };
    });
    const donutEl = document.getElementById('dashDonut');
    if(donutEl) {
      const svgPaths = donut.map(d => {
        const x1 = 60 + 48*Math.cos((d.start*2*Math.PI)-Math.PI/2);
        const y1 = 60 + 48*Math.sin((d.start*2*Math.PI)-Math.PI/2);
        const x2 = 60 + 48*Math.cos((d.end*2*Math.PI)-Math.PI/2);
        const y2 = 60 + 48*Math.sin((d.end*2*Math.PI)-Math.PI/2);
        const large = d.end-d.start > 0.5 ? 1 : 0;
        return `<path d="M60 60 L${x1} ${y1} A48 48 0 ${large} 1 ${x2} ${y2} Z" fill="${d.color}" opacity="0.85"/>`;
      }).join('');
      donutEl.innerHTML = `<circle cx="60" cy="60" r="48" fill="none" stroke="var(--border)" stroke-width="1"/>${svgPaths}<circle cx="60" cy="60" r="28" fill="var(--bg)"/>`;
    }
    const legendEl = document.getElementById('dashLegend');
    if(legendEl) legendEl.innerHTML = donut.map(d => `
      <div class="donut-legend-item"><span class="donut-dot" style="background:${d.color};"></span>${d.status} (${d.count})</div>
    `).join('');

    const recentEl = document.getElementById('dashRecent');
    if(recentEl) {
      const recent = [...data].sort((a,b) => new Date(b.date)-new Date(a.date)).slice(0,5);
      recentEl.innerHTML = recent.map(a => `
        <tr><td>${a.type}</td><td>${a.paroisse}</td><td>${a.nom}</td><td>${fmtDate(a.date)}</td><td><span class="badge ${STATUS_CLASS[a.status]}">${a.status}</span></td></tr>
      `).join('') || '<tr><td colspan="5" class="empty">Aucune activité</td></tr>';
    }
  };

  // ── Activities list ──
  window.renderActs = function() {
    const el = document.getElementById('actsList');
    if(!el) return;
    el.innerHTML = data.map(a => `
      <tr>
        <td>${a.type}</td>
        <td>${a.paroisse}</td>
        <td>${a.nom}</td>
        <td>${fmtDate(a.date)}</td>
        <td><span class="badge ${STATUS_CLASS[a.status]}">${a.status}</span></td>
        <td>
          <div class="row-actions" style="display:flex;gap:4px;">
            ${a.status !== 'Clôture' ? `<button class="btn btn-sm" onclick="UP.advanceStatus(${a.id})">Avancer</button>` : ''}
            <button class="btn btn-sm btn-ghost" onclick="UP.deleteAct(${a.id})">✕</button>
          </div>
        </td>
      </tr>
    `).join('') || '<tr><td colspan="6" class="empty">Aucune activité enregistrée</td></tr>';
  };

  window.addActivity = function() {
    const type = document.getElementById('actType').value;
    const paroisse = document.getElementById('actParoisse').value;
    const nom = document.getElementById('actNom').value.trim() || 'Non précisé';
    const date = document.getElementById('actDate').value || new Date().toISOString().slice(0,10);
    const notes = document.getElementById('actNotes').value;
    data.push({ id: Date.now(), type, paroisse, nom, date, status:'Demande', notes });
    saveData(data);
    document.getElementById('actNom').value = '';
    document.getElementById('actNotes').value = '';
    renderActs();
    renderDash();
    alert('Activité enregistrée !');
  };

  window.advanceStatus = function(id) {
    const a = data.find(x => x.id === id);
    if(!a) return;
    const idx = STATUSES.indexOf(a.status);
    if(idx < STATUSES.length-1) a.status = STATUSES[idx+1];
    saveData(data);
    renderActs();
    renderDash();
  };

  window.deleteAct = function(id) {
    if(!confirm('Supprimer cette activité ?')) return;
    data = data.filter(x => x.id !== id);
    saveData(data);
    renderActs();
    renderDash();
  };

  // ── Reports ──
  window.renderReport = function() {
    const m = parseInt(document.getElementById('repMonth').value);
    const y = parseInt(document.getElementById('repYear').value);
    const filtered = data.filter(a => { const d = new Date(a.date); return d.getMonth()===m && d.getFullYear()===y; });

    const byType = {};
    filtered.forEach(a => { byType[a.type] = (byType[a.type]||0)+1; });
    const rt = document.getElementById('repByType');
    if(rt) rt.innerHTML = Object.entries(byType).sort((a,b)=>b[1]-a[1]).map(([k,v]) => `
      <div class="report-row"><span>${k}</span><span style="font-weight:600;">${v}</span></div>
    `).join('') || '<div class="empty">Aucune donnée</div>';
    if(rt && Object.keys(byType).length) rt.innerHTML += `<div class="report-row total"><span>Total</span><span>${filtered.length}</span></div>`;

    const byPar = {};
    filtered.forEach(a => { byPar[a.paroisse] = (byPar[a.paroisse]||0)+1; });
    const rp = document.getElementById('repByParoisse');
    if(rp) rp.innerHTML = Object.entries(byPar).sort((a,b)=>b[1]-a[1]).map(([k,v]) => `
      <div class="report-row"><span>${k}</span><span style="font-weight:600;">${v}</span></div>
    `).join('') || '<div class="empty">Aucune donnée</div>';

    const bySt = {};
    STATUSES.forEach(s => bySt[s] = filtered.filter(a => a.status===s).length);
    const rs = document.getElementById('repByStatus');
    if(rs) rs.innerHTML = STATUSES.map(s => `
      <div class="report-row"><span>${s}</span><span style="font-weight:600;">${bySt[s]}</span></div>
    `).join('');

    const monthName = document.getElementById('repMonth').options[m].text;
    const rt2 = document.getElementById('repText');
    if(rt2) rt2.innerHTML = filtered.length === 0
      ? `Aucune activité pastorale n'a été enregistrée pour <strong>${monthName} ${y}</strong>.`
      : `Bilan pastoral — <strong>${monthName} ${y}</strong><br><br>Au cours de ce mois, l'unité pastorale a enregistré <strong>${filtered.length} activité${filtered.length>1?'s':''}</strong> réparties sur ${Object.keys(byPar).length} paroisse(s). Les catégories les plus représentées sont : ${Object.entries(byType).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k,v])=>`${k} (${v})`).join(', ')}. <br><br>Sur le plan des statuts, ${bySt['Clôture']} activité${bySt['Clôture']>1?'s':''} ${bySt['Clôture']>1?'ont été clôturées':'a été clôturée'}, ${bySt['Célébration']} ${bySt['Célébration']>1?'sont en célébration':'est en célébration'}, ${bySt['Préparation']} en préparation et ${bySt['Demande']} en phase de demande initiale.`;
  };

  window.exportReport = function() {
    const m = document.getElementById('repMonth').options[document.getElementById('repMonth').value].text;
    const y = document.getElementById('repYear').value;
    const text = document.getElementById('repText').innerText;
    const blob = new Blob([`Rapport pastoral — ${m} ${y}\n\n${text}\n\nGénéré le ${new Date().toLocaleDateString('fr-FR')}`], {type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `rapport-${m.toLowerCase()}-${y}.txt`;
    a.click();
  };

  // ── Music player ──
  let isPlaying = false, playInterval = null, currentTrack = 0;

  window.renderMusic = function() {
    const pl = document.getElementById('playlist');
    if(pl) pl.innerHTML = tracks.map((t,i) => `
      <div class="playlist-item ${i===currentTrack?'active':''}" onclick="UP.selectTrack(${i})">
        <div class="playlist-num">${i+1}</div>
        <div style="flex:1;min-width:0;">
          <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t.title}</div>
          <div style="font-size:12px;color:var(--text-light);">${t.artist}</div>
        </div>
        <div style="font-size:12px;color:var(--text-light);">${t.dur}</div>
      </div>
    `).join('');
  };

  window.renderVideos = function() {
    const vg = document.getElementById('videoGrid');
    if(vg) vg.innerHTML = videos.map(v => `
      <div class="video-card">
        <div class="video-thumb">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          <span class="video-dur">${v.dur}</span>
        </div>
        <div class="video-meta">
          <div class="video-title">${v.title}</div>
        </div>
      </div>
    `).join('');
  };

  window.togglePlay = function() {
    isPlaying = !isPlaying;
    const btn = document.getElementById('playBtn');
    if(btn) btn.innerHTML = isPlaying ? '⏸' : '▶';
    if(isPlaying) {
      let w = parseFloat(document.getElementById('progFill').style.width) || 0;
      playInterval = setInterval(() => { w += 0.3; if(w>100){w=0;UP.nextTrack();} document.getElementById('progFill').style.width = w+'%'; }, 100);
    } else {
      clearInterval(playInterval);
    }
  };

  window.seek = function(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width * 100;
    document.getElementById('progFill').style.width = pct + '%';
  };

  window.selectTrack = function(i) {
    currentTrack = i;
    isPlaying = false;
    clearInterval(playInterval);
    document.getElementById('progFill').style.width = '0%';
    document.getElementById('trackTitle').textContent = tracks[i].title;
    document.getElementById('trackArtist').textContent = tracks[i].artist;
    document.getElementById('trackTime').textContent = '0:00 / ' + tracks[i].dur;
    document.getElementById('playBtn').textContent = '▶';
    renderMusic();
  };

  window.nextTrack = function() { selectTrack((currentTrack+1)%tracks.length); togglePlay(); };

  // ── Init ──
  document.addEventListener('DOMContentLoaded', function() {
    renderDash();
    renderActs();
    renderMusic();
    renderVideos();
    const ad = document.getElementById('actDate');
    if(ad) ad.value = new Date().toISOString().slice(0,10);
  });

  // Expose
  window.UP = {
    renderDash, renderActs, addActivity, advanceStatus, deleteAct,
    renderReport, exportReport,
    renderMusic, renderVideos, togglePlay, seek, selectTrack, nextTrack
  };
})();
