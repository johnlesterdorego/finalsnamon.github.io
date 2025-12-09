
        const DATA = {
            coral: {
                title: 'Coral Reefs',
                body: 'Coral reefs are often called the "rainforests of the sea" due to their extraordinary biodiversity. They are complex ecosystems built by tiny organisms called polyps. They protect coastlines from storms and provide critical habitat for about 25% of all marine life.',
                tags: ['Biodiversity Hotspot', 'Threat: Bleaching (temp rise)', 'Action: Support MPA', 'Ecosystem Services'],
                icon: document.getElementById('coral')?.querySelector('img')?.dataset.imgUrl
            },
            turtle: {
                title: 'Sea Turtle',
                body: 'Sea turtles are reptiles that play vital roles in marine ecosystems. For example, "Green Sea Turtles" maintain healthy seagrass beds, and Hawksbill Turtles control sponge populations on reefs. All seven species are threatened by poaching, habitat loss, and plastic pollution.',
                tags: ['Keystone Species', 'Threat: Plastic Ingestion', 'Action: Reduce Plastic', 'Migratory'],
                icon: document.getElementById('turtle')?.querySelector('img')?.dataset.imgUrl
            },
            fish: {
                title: 'Fish Shoal',
                body: 'A fish shoal (or school) is a large group of fish swimming in a coordinated way, primarily for safety and foraging efficiency. Healthy fish stocks are essential for global food security, but unsustainable fishing practices are leading to population collapse in many regions.',
                tags: ['Food Security', 'Threat: Overfishing', 'Action: Sustainable Seafood', 'Collective Behavior'],
                icon: document.getElementById('fish')?.querySelector('img')?.dataset.imgUrl
            },
            pollution: {
                title: 'Marine Pollution',
                body: '"Plastic debris" is the most visible form of pollution, harming animals through entanglement and ingestion. Chemical runoff from agriculture and industrial waste causes dead zones and acidification. It disrupts the entire food web.',
                tags: ['Microplastics', 'Threat: Oil Spills', 'Action: Proper Disposal', 'Chemical Runoff'],
                icon: document.getElementById('pollution')?.querySelector('img')?.dataset.imgUrl
            },
            jellyfish: {
                title: 'Jellyfish',
                body: 'Jellyfish are invertebrates with no brain, bones, or heart. They are part of the plankton community. Recent studies indicate an increase in some jellyfish populations, potentially due to overfishing of their predators and warmer waters (climate change).',
                tags: ['Invertebrate', 'Indicator Species', 'Threat: Predator Loss', 'Boom-and-Bust Cycle'],
                icon: document.getElementById('jellyfish')?.querySelector('img')?.dataset.imgUrl
            },
            mangrove: {
                title: 'Mangrove Forest',
                body: 'These coastal trees are vital **blue carbon** ecosystems, storing up to four times more carbon than terrestrial forests. Their dense root systems stabilize shorelines, protect against storm surges, and serve as critical nursery habitats for juvenile fish and crustaceans.',
                tags: ['Blue Carbon', 'Coastal Protection', 'Nursery Habitat', 'Action: Reforestation'],
                icon: document.getElementById('mangrove')?.querySelector('img')?.dataset.imgUrl
            }
        };

        const popup = document.getElementById('popup');
        const popupIcon = document.getElementById('popupIcon');
        const popupTitle = document.getElementById('popupTitle');
        const popupBody = document.getElementById('popupBody');
        const popupTags = document.getElementById('popupTags');
        const closeBtn = document.getElementById('closePopup');
        const saveFavBtn = document.getElementById('saveFav');
        const challengeBtn = document.getElementById('challengeBtn');
        const favList = document.getElementById('favList');
        const topicFilter = document.getElementById('topicFilter');
        const searchFav = document.getElementById('searchFav');
        const scene = document.getElementById('scene');
        
        const zoomedImageContainer = document.getElementById('zoomedImageContainer');
        const zoomedImage = document.getElementById('zoomedImage');
        const closeZoomBtn = document.getElementById('closeZoom');
        
        Object.keys(DATA).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = DATA[key].title;
            topicFilter.appendChild(option);
        });

        function showPopup(key){
            const d = DATA[key];
            const itemElement = document.getElementById(key);

            if (itemElement) {
                scene.appendChild(itemElement);
                itemElement.style.zIndex = 50;
            }

            popupIcon.src = d.icon;
            popupIcon.alt = d.title + ' Icon';
            popupTitle.textContent = d.title;
            popupBody.textContent = d.body;
            popupTags.innerHTML = '';
            d.tags.forEach(t=>{const el=document.createElement('div');el.className='tag';el.textContent=t;popupTags.appendChild(el)});
            popup.style.display='block';
            popup.setAttribute('aria-hidden','false');
            popup.dataset.key = key;

            challengeBtn.onclick = () => {
                let message = '';
                switch(key) {
                    case 'coral': message = "Coral Bleaching: Did you know corals expel the algae living in their tissues when stressed by changes in temperature, causing them to turn white? This doesn't kill them immediately, but starves them. Help by supporting climate action!"; break;
                    case 'turtle': message = "Nesting Sites: Female sea turtles return to the exact beach where they were born to lay their own eggs. Protecting these beaches from light and noise pollution is crucial for their survival."; break;
                    case 'fish': message = "Shoaling: Fish shoal for protection—predators find it hard to target a single fish in a large, rapidly moving mass. This is a classic example of collective animal behavior."; break;
                    case 'pollution': message = "The Great Pacific Garbage Patch: This is not a solid island of trash, but a vast area of highly concentrated plastic debris, mostly microplastics, twice the size of Texas. The best action is stopping trash from reaching the ocean."; break;
                    case 'jellyfish': message = "Invasive Species: Some invasive jellyfish species can rapidly increase in number (blooms) and cause massive damage to fisheries and aquaculture by eating fish eggs or stinging fish."; break;
                    case 'mangrove': message = "The Root System: Mangrove roots filter water, stabilizing the ecosystem and providing clearer water for nearby coral reefs to thrive. They are a link between land and sea."; break;
                    default: message = "Explore more fascinating facts about this marine life!";
                }
                alert(message);
            };
        }
        
        function openZoom(imageSrc) {
            zoomedImage.src = imageSrc;
            zoomedImageContainer.classList.add('zoomed-active');
            popup.style.display = 'none';
        }

        function closeZoom() {
            zoomedImageContainer.classList.remove('zoomed-active');
            setTimeout(() => {
                zoomedImageContainer.style.display = 'none';
                zoomedImage.src = ''; 
            }, 400); 
        }

        document.querySelectorAll('.zoom-in-trigger').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); 
                const imageSrc = e.target.dataset.imgSrc;
                openZoom(imageSrc);
            });
        });
        
        closeZoomBtn.addEventListener('click', closeZoom);

        
        Object.keys(DATA).forEach(id=>{
            const el = document.getElementById(id);
            if(!el) return;
            el.addEventListener('click', (e)=> {
                 if (e.target.tagName !== 'BUTTON') { 
                     showPopup(id);
                 }
            });
        });

        closeBtn.addEventListener('click', ()=>{popup.style.display='none';popup.setAttribute('aria-hidden','true');});

        function loadFavs(){
            const raw = localStorage.getItem('cv_favs')||'[]';
            try{ return JSON.parse(raw).sort((a,b) => b.timestamp - a.timestamp);}catch(e){return []}
        }
        function saveFavs(favs){localStorage.setItem('cv_favs', JSON.stringify(favs));}

        function renderFavs(filter=''){
            const favs = loadFavs();
            favList.innerHTML='';
            
            const filteredFavs = favs.filter(f=>
                f.title.toLowerCase().includes(filter.toLowerCase()) || 
                f.note.toLowerCase().includes(filter.toLowerCase())
            );

            if (filteredFavs.length === 0 && filter) {
                favList.innerHTML = `<div style="padding:10px;text-align:center;color:#b14427;">No notes found for "${filter}".</div>`;
                return;
            } else if (filteredFavs.length === 0) {
                favList.innerHTML = `<div style="padding:10px;text-align:center;color:#2b5d75;">You haven't saved any notes yet.</div>`;
                return;
            }

            filteredFavs.forEach((f,idx)=>{
                const node = document.createElement('div');node.className='fav-item';
                const originalIndex = favs.findIndex(item => item.key === f.key && item.timestamp === f.timestamp);

                node.innerHTML = `
                    <strong>${f.title}</strong>
                    <div style="font-size:.9rem;margin-top:6px">${f.note}</div>
                    <div style="font-size:.75rem;color:#999;margin-top:4px;">Saved: ${new Date(f.timestamp).toLocaleDateString()}</div>
                    <div style="margin-top:8px;text-align:right">
                        <button data-key="${f.key}" class="goBtn">Open</button> 
                        <button data-idx="${originalIndex}" class="delBtn">Delete</button>
                    </div>
                `;
                favList.appendChild(node);
            });
            
            attachFavHandlers();
        }
        
        function attachFavHandlers() {
            Array.from(document.getElementsByClassName('goBtn')).forEach(b=>b.addEventListener('click', e=>{
                const key = e.target.dataset.key; 
                showPopup(key);
            }));

            Array.from(document.getElementsByClassName('delBtn')).forEach(b=>b.addEventListener('click', e=>{
                const idx = +e.target.dataset.idx;
                const arr = loadFavs();
                arr.splice(idx,1);
                saveFavs(arr);
                renderFavs(searchFav.value);
            }));
        }

        saveFavBtn.addEventListener('click', ()=>{
            const key = popup.dataset.key;
            const d = DATA[key];
            const note = prompt('Add a short note about this item (max 100 chars):', 'My note on ' + d.title) || '';
            
            if (note.length > 100) {
                 alert('Note too long. Max 100 characters.');
                 return;
            }

            if(note.trim() === '') {
                alert('Note cannot be empty.');
                return;
            }

            const arr = loadFavs();
            arr.push({key: key, title: d.title, note: note.trim(), timestamp: Date.now()});
            saveFavs(arr);
            renderFavs(searchFav.value);
            alert('Saved to your notes!');
        });

        topicFilter.addEventListener('change', ()=>{
            const val=topicFilter.value; 
            if(val) {
                showPopup(val);
                topicFilter.value = ''; 
            }
        });
        
        searchFav.addEventListener('input', ()=> renderFavs(searchFav.value));

        renderFavs();
        
        document.addEventListener('keydown', (e)=>{
            if(e.key==='Escape'){
                popup.style.display='none';
                popup.setAttribute('aria-hidden','true');
                closeZoom();
            }
        });
