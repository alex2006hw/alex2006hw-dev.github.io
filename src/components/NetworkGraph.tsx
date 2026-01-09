import React, { useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

export const NetworkGraph: React.FC<{ onNodeClick: (node: any) => void }> = ({ onNodeClick }) => {
  const fgRef = useRef<any>(null);

  // TEMPLATE DATA: Matches what is in scripts/create_db.js
  const data = {
    nodes: [
      { id: 'root', group: 1, label: 'Blog Root' },
      
      // Tags
      { id: 'tag_tech', group: 2, label: 'Technology' },
      { id: 'tag_nature', group: 2, label: 'Nature' },
      
      // Posts
      { id: 'post_1', group: 3, label: 'Future Tech', 
        details: { 
            title: 'The Future of Tech', date: '2023-01-15', 
            media_type: 'image', media_url: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=600&q=80',
            content: 'Exploring the boundaries of AI and React...'
        } 
      },
      { id: 'post_2', group: 3, label: 'Graph Theory', 
        details: { 
            title: 'Visualizing Graphs', date: '2023-03-22', 
            media_type: 'video', media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            content: 'How nodes and edges create meaning...'
        } 
      },
      { id: 'post_3', group: 3, label: 'Forest Walk', 
        details: { 
            title: 'A Walk in the Woods', date: '2024-06-10', 
            media_type: 'image', media_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
            content: 'Nature photography and peace of mind...'
        } 
      },
      { id: 'post_4', group: 3, label: 'Big Bunny', 
        details: { 
            title: 'Animation History', date: '2025-01-05', 
            media_type: 'video', media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            content: 'The classic open source movie...'
        } 
      },
    ],
    links: [
      { source: 'root', target: 'tag_tech' },
      { source: 'root', target: 'tag_nature' },
      { source: 'tag_tech', target: 'post_1' },
      { source: 'tag_tech', target: 'post_2' },
      { source: 'tag_nature', target: 'post_3' },
      { source: 'tag_nature', target: 'post_4' },
      { source: 'post_1', target: 'post_2' } // Related link
    ]
  };

  return (
    <div style={{ height: '100%', border: '1px solid #333' }}>
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        nodeLabel="label"
        nodeThreeObject={(node: any) => {
            // LOD: Root is Sphere, Tags are Cubes, Posts are Sprites
            if (node.group === 1) return new THREE.Mesh(new THREE.SphereGeometry(8), new THREE.MeshLambertMaterial({ color: '#ff0055' }));
            if (node.group === 2) return new THREE.Mesh(new THREE.BoxGeometry(6,6,6), new THREE.MeshLambertMaterial({ color: '#00cc88' }));
            
            // Posts
            const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ color: '#00aaff' }));
            sprite.scale.set(4,4,4);
            return sprite;
        }}
        onNodeClick={(node: any) => {
            // FIX: Explicitly typed 'node' as any
            const n = node;
            const x = n.x || 0;
            const y = n.y || 0;
            const z = n.z || 0;

            // Camera Fly
            const distance = 40;
            const distRatio = 1 + distance/Math.hypot(x, y, z);
            
            if (fgRef.current) {
                fgRef.current.cameraPosition(
                    { x: x * distRatio, y: y * distRatio, z: z * distRatio },
                    node,
                    2000
                );
            }
            if(n.group === 3) onNodeClick(n);
        }}
      />
    </div>
  );
};