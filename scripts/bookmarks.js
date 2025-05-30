console.log("YES, I'M HERE");

const sidebarBookmarkTemplate = document.getElementById('sidebar_bkmk_tmp');

function cloneSidebarBookmarks(bkmkName, bkmkUrl){

  const sidebarBookmarkContainer = document.getElementById('sidebar-bkmk-list');
  const clone = sidebarBookmarkTemplate.cloneNode(true);
  clone.removeAttribute("id"); 

  if (clone.classList.contains('hidden1x1')) {
    clone.classList.remove('hidden1x1');
  }
  const name = clone.querySelector('.sidebar-bkmk-name');
  if (name) name.textContent = bkmkName;

  //const link = clone.querySelector('.bkmk-link');
  // if (link) link.setAttribute('href', bkmkUrl);
  clone.href = bkmkUrl;

  sidebarBookmarkContainer.appendChild(clone);

};

(async () => {
    const { data: user_bkmk, error: user_bkmk_error } = await supabase.rpc('get_user_bookmarks', {
      member_id_input: window.memberId,
      location_input: "sidebar",
    });
    
    if (error) {
      console.error(user_bkmk_error);
    } else {
    
      const sidebarBookmarkContainer = document.getElementById('sidebar-bkmk-list');
    
      user_bkmk.forEach(bookmark => {
    
        cloneSidebarBookmarks(bookmark.bookmark_name, bookmark.url);
    
      });
    }
})();
 $("#submit_bookmark").on("click", async function(e) {
   e.preventDefault();

   const { data, error } = await supabase.rpc('add_user_bookmark', {
     member_id_input:  window.memberId,
     bookmark_name_input: $("#bkmk-name").val(),
     location_input: "sidebar",
     section_id_input: "f6dfbdb9-a547-4f70-9d9a-759d390b52dd",
     bookmark_id_input: "f6dfbdb9-a547-4f70-9d9a-759d390b52dd",
     url_input:  $("#bkmk-link").val()
   });

   if (error) {
     console.error(error);
   } else {
     console.log(data);
     cloneSidebarBookmarks( $("#bkmk-name").val(), $("#bkmk-link").val());
     $("#email-form input").val("");
     $("#close-modal").click();
     $.toast({
          text: 'Bookmark successfully added!',
          showHideTransition: 'slide',
          icon: 'success'
      })
   }
 });
