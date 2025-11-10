import React, { useState } from "react";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); 

    const handleSubmit = async (e) => {
        console.log("Title:", title);
        console.log("Description:", description);
    };

    return(
        <div>
            <div>
                <label style={styles.label}>Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}  
                />
            </div>

            <div>
                <label style={styles.label}>Description</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}  
                />
            </div>

            <button style ={styles.button} onClick={handleSubmit}>Submit</button>

        </div>        


        
    );
}

const styles = {
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  headerImage: {
    width: '100%',
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  step: {
    fontSize: 16,
    marginBottom: 12,
    color: '#374151',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
};
