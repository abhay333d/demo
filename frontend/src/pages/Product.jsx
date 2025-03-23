import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const Product = () => {

  const { productId } = useParams();
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [showAR, setShowAR] = useState(false);
  const [similarSizeProducts, setSimilarSizeProducts] = useState([]);

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  const handleARView = () => {
    // setShowAR(!showAR);
    const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    const arButton = ARButton.createButton(renderer, {
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay"],
      domOverlay: { root: document.body },
    });
    document.body.appendChild(arButton);

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const ringGeometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(
      -Math.PI / 2
    );
    const ringMaterial = new THREE.MeshBasicMaterial();
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.matrixAutoUpdate = false;
    ring.visible = false;
    scene.add(ring);

    const controller = renderer.xr.getController(0);
    scene.add(controller);

    const loader = new GLTFLoader();

    const loadModel = (position) => {
      loader.load(
        "../models/floor_lamp.glb",
        (gltf) => {
          const model = gltf.scene;
          model.position.copy(position);
          model.scale.set(0.8, 0.8, 0.8);

          const bbox = new THREE.Box3().setFromObject(model);
          model.position.y -= bbox.min.y / 4;

          scene.add(model);
        },
        undefined,
        (error) => console.error("Error loading model:", error)
      );
    };

    controller.addEventListener("select", () => {
      if (ring.visible) {
        const position = new THREE.Vector3();
        position.setFromMatrixPosition(ring.matrix);
        loadModel(position);
      }
    });

    renderer.xr.addEventListener("sessionstart", async () => {
      const session = renderer.xr.getSession();
      const viewerReferenceSpace = await session.requestReferenceSpace("viewer");
      const hitTestSource = await session.requestHitTestSource({
        space: viewerReferenceSpace,
      });

      renderer.setAnimationLoop((timestamp, frame) => {
        if (!frame) return;

        const hitTestResults = frame.getHitTestResults(hitTestSource);

        if (hitTestResults.length) {
          const hit = hitTestResults[0];
          const referenceSpace = renderer.xr.getReferenceSpace();
          const hitPose = hit.getPose(referenceSpace);

          ring.visible = true;
          ring.matrix.fromArray(hitPose.transform.matrix);
        } else {
          ring.visible = false;
        }

        renderer.render(scene, camera);
      });
    });

    renderer.xr.addEventListener("sessionend", () => {
      console.log("session end");
    });

    return () => {
      containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
  }

  useEffect(() => {
    fetchProductData();
  }, [productId,products])

  useEffect(() => {
    if (productData && products.length > 0) {
      // Find products with the same sizes
      const sameSize = products.filter(item => 
        item._id !== productData._id && // Don't include current product
        item.sizes.some(size => productData.sizes.includes(size))
      );
      
      // Take only the first 5 products
      setSimilarSizeProducts(sameSize.slice(0, 5));
    }
  }, [productData, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                ))
              }
          </div>
          <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className=' flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          
          <div className='flex gap-4 mt-8'>
            <button onClick={()=>addToCart(productData._id, productData.sizes[0])} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
            <button 
              onClick={() => window.location.href = `../HTMLs/${productData.name.toLowerCase().replace(/\s+/g, '_')}.html`}
            className='border border-black px-8 py-3 text-sm hover:bg-gray-100'
          >
            VIEW IN AR
          </button>

          </div>
          
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* --------- display related products ---------- */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

      {/* --------- display products with similar sizes ---------- */}
      {similarSizeProducts.length > 0 && (
        <div className='my-24'>
          <div className='text-center text-3xl py-2'>
            <Title text1={'SIMILAR'} text2={'SIZES'} />
          </div>
          <div className='mt-6'>
            <p className='mb-4 text-gray-600'>Products available in similar sizes:</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
              {similarSizeProducts.map((item, index) => (
                <div key={index} className='border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 bg-white'>
                  <div className='overflow-hidden rounded-md mb-2'>
                    <img 
                      src={item.image[0]} 
                      alt={item.name} 
                      className='w-full h-48 object-cover hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                  <h3 className='font-medium text-gray-800 truncate'>{item.name}</h3>
                  <div className='flex justify-between items-center mt-2'>
                    <p className='font-bold text-gray-900'>{currency}{item.price}</p>
                    <div className='text-xs bg-gray-100 px-2 py-1 rounded-full'>
                      {item.sizes.join(', ')}
                    </div>
                  </div>
                  <button 
                    onClick={() => window.location.href = `/product/${item._id}`}
                    className='w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded text-sm transition-colors'
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  ) : <div className=' opacity-0'></div>
}

export default Product
