        $(document).ready(function() {
            $('#fullpage').fullpage({
              sectionsColor: ['#E6A13A', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
              anchors: ['problem', 'usHelp', 'weCreate', 'minnesotaMedia', 'begin'],
//               menu: '#usHelpUl',
//               lazyLoading: true,
// 		      slidesNavigation: true,
		      scrollBar: true,
// 				autoScrolling: false,
				verticalCentered: true,
				'onLeave': function(index, nextIndex, direction){
					var book = document.querySelector(".book");
					if(index==1&&nextIndex==2){
						book.classList.remove("moveUp");
						book.classList.add("moveDown");
					}else if(index==2&&nextIndex==1){
						book.classList.remove("moveDown");
						book.classList.add("moveUp");
					}

			},
		      afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){

		          console.log(slideAnchor);
		          var lis = document.querySelectorAll("#usHelpUl li");
		          for(var i = 0;i<lis.length;i++){
		              lis[i].classList.remove("active");
		              if(i==slideIndex){
		                  lis[i].classList.add("active");
		              }
		          }

		      }
            });
        });