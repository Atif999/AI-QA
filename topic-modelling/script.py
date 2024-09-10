import nltk
import sys
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import pinecone

pinecone.init(api_key='YOUR_PINECONE_API_KEY')
index = pinecone.Index("ai-qa")

# Preprocess Text
def preprocess_text(text):
    nltk.download('stopwords')
    stopwords = set(nltk.corpus.stopwords.words('english'))
    return [word for word in text.lower().split() if word not in stopwords]

# Topic Modeling
def extract_topics(documents, n_topics=5):
    vectorizer = CountVectorizer(max_df=0.95, min_df=2, max_features=1000)
    dtm = vectorizer.fit_transform(documents)
    lda = LatentDirichletAllocation(n_components=n_topics)
    lda.fit(dtm)
    return lda, vectorizer

# Update Metadata
def update_metadata_with_topics(documents):
    lda, vectorizer = extract_topics(documents)
    topics = lda.components_

    for doc_id, topic in enumerate(topics):
        topic_keywords = [vectorizer.get_feature_names_out()[i] for i in topic.argsort()[:-10 - 1:-1]]
        index.update(id=str(doc_id), metadata={'topics': topic_keywords})

if __name__ == "__main__":
    with open(sys.argv[1], 'r') as file:
        documents = [file.read()]  
    update_metadata_with_topics(documents)
