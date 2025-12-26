import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { motion } from "framer-motion";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="listPage">
      <div className="search-container">
        <Filter />
      </div>

      <div className="content-split">
        <div className="listContainer">
          <div className="wrapper">
            <div className="card-grid">
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts!</p>}
                >
                  {(postResponse) =>
                    postResponse.data.map((post, index) => {
                      // Inject mock urgency data for demo
                      const isHot = index % 3 === 0;
                      const discount = index % 4 === 0 ? 15 : 0;
                      const oldPrice = discount > 0 ? Math.round(post.price * 1.15) : null;

                      const enhancedPost = { ...post, isHot, discount, oldPrice };

                      return <Card key={post.id} item={enhancedPost} index={index} />;
                    })
                  }
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
        <div className="mapContainer">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <Map items={postResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
