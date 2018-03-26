      var iPage = 1;
      //获取留言列表
      function toGetList(artid){
      $.ajax({
        type:'post',
        url:'../guestbook/index.php',
        data:{
          m:'index',
          a:'getList',
          n:4,
          page:iPage,
          artid:artid
        },
        success:function(data){
          var data = JSON.parse(data)
          if(data.code == 0){
            forFn(data)
          }
        }
      })
      }
      //留言
      function send(artid){
        $.ajax({
          type:'post',
          url:'../guestbook/index.php',
          data:{
            m:'index',
            a:'send',
            content:$('#comment').val(),
            artid:artid
          },
          success:function(data){
            var data = JSON.parse(data)
            if(data.code == 0){
              alert(data.message)
              var myComment = `<div class="comment">
                <h4>${data.data.username}</h4>
                <p>${data.data.content}</p>
                <span>0</span>
                <span><a href="" class="oppose" cid="${data.data.cid}">反对</a></span>
                <span>0</span>
                <span><a href="" class="support" cid="${data.data.cid}">赞</a></span>
                <span>${data.data.dateline}</span>
              </div>`
              //判断是否已经有留言，没有的话就直接append，有的话就在第一个前面插入
              if($('#left_bottom').children().length == 1){
                $('#left_bottom').append(myComment)
              }else{
                $('#left_bottom').find('div').eq(1).before(myComment)
              }
              $('#comment').val('')
            }else{
              alert(data.message)
            }
          }
        })
      }
      //显示更多
      function showMore(artid){
        iPage++
        $.ajax({
          type:'post',
          url:'../guestbook/index.php',
          data:{
            m:'index',
            a:'getList',
            n:4,
            page:iPage,
            artid:artid
          },
          success:function(data){
            var data = JSON.parse(data)
            if(data.code == 0){
              forFn(data)
            }else{
              alert('没有更多留言了')
            }
          }
        })
      }
      //踩
      function oppose(e){
        DorC(e,'doOppose') 
      }

      //赞
      function support(e){
        DorC(e,'doSupport')
      }

      //顶或踩
      function DorC(e,type){
        $.ajax({
          type:'post',
          url:'../guestbook/index.php',
          data:{
            m:'index',
            a:type,
            cid:e.target.getAttribute('cid')
          },
          success:function(data){
            var data = JSON.parse(data)
            alert(data.message)
            if(data.code == 0){
              var newCount = parseInt(e.target.parentNode.previousElementSibling.innerHTML) + 1
              e.target.parentNode.previousElementSibling.innerHTML = newCount
            }
          }
        })   
      }

      function forFn(data){
        for(var i = 0; i < data.data.list.length; i++){
          var myComment = `<div class="comment">
            <h4>${data.data.list[i].username}</h4>
            <p>${data.data.list[i].content}</p>
            <span>${data.data.list[i].oppose}</span>
            <span><a href="#" class="oppose" cid="${data.data.list[i].cid}">反对</a></span>
            <span>${data.data.list[i].support}</span>
            <span><a href="#" class="support" cid="${data.data.list[i].cid}">赞</a></span>
            <span>${data.data.list[i].dateline}</span>
          </div>`
          $('#left_bottom').append(myComment)
        }
      }
