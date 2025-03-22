
function About(){
  return(<>
    <div className="position-relative d-flex align-items-center justify-content-center pt-62" style={{minHeight: "300px"}}>
      <div className="position-absolute banner-position banner-img"></div>
      <h2 className="fs-1 fw-bold text-white">品牌故事</h2>
    </div>
    <div className="bg-white100">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-10 mx-auto text-dark200">
            <h3 className="fw-bold mb-4 text-dark100">Black Heart Bakery —— 烘焙靈魂的溫度</h3>
            <p className="mb-5 lh-lg">
              夜色沉靜，黑咖啡的苦香與剛出爐的可可麵包交融在空氣裡，輕輕喚醒味蕾深處的記憶。這裡是 Black Heart Bakery，一間用低調溫柔的黑，勾勒細膩層次的烘焙坊。
            </p>
            <div data-aos="fade-right">
              <div className="row flex-column flex-lg-row mb-5">
                <div className="col-lg-6 d-flex align-items-center">
                  <div className="lh-lg">
                    <p className="fw-bold mb-3 text-dark100 fs-5">
                      黑色，不只是深沉，更是一種純粹。
                    </p>
                    <p className="mb-3">
                      我們相信，食物不該只是甜膩的安慰，而應該帶著靈魂的溫度，喚起內心最真實的悸動。從選用來自世界各地的黑巧克力，到慢發酵的黑麥麵包，我們在時間裡淬鍊屬於自己的味道。沒有多餘的裝飾，只有最純粹的本質，如同我們的初心——用每一次揉捏、每一次烘焙，傳遞最深邃的溫暖。
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img src="https://images.unsplash.com/photo-1598040355808-00c89dae08be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI3fHx8ZW58MHx8fHx8" alt="aboutImage-1" className="w-100 object-fit-cover"/>
                </div>
              </div>
            </div>
            <div data-aos="fade-left">
              <div className="row flex-column flex-lg-row-reverse mb-5">
                <div className="col-lg-6 d-flex align-items-center">
                  <div className="lh-lg">
                    <p className="fw-bold mb-3 text-dark100 fs-5">
                      Black Heart，不是冷漠，而是熱愛。
                    </p>
                    <p className="mb-3">
                      我們的烘焙，就像黑夜裡的一盞燈，靜靜地等待著與懂得它的人相遇。我們用低溫熟成的可可與堅果，烘焙帶有微苦層次的甜點，讓每一口都像是一首耐人尋味的詩，餘韻悠長。
                    </p>
                    <p className="mb-3">
                      走進 Black Heart Bakery，你會發現這裡不只是麵包店，更是一個能安放情緒、品味生活的角落。無論是習慣在靜謐中尋找自我的獨行者，還是喜歡在微光下分享美味的知己，都能在這裡找到一份屬於自己的溫度。
                    </p>
                    <p className="mb-3">
                      在這個過度喧囂的世界，我們選擇用黑，去襯托真正的美好。
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img src="https://images.unsplash.com/photo-1648824572507-24e6e9ef6916?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D" alt="aboutImage-2" className="w-100 object-fit-cover" />
                </div>
              </div>
            </div>
            <p className="fw-bold text-end fs-5" data-aos="fade-up">—— Black Heart Bakery，黑，讓味道更深刻。</p>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default About;