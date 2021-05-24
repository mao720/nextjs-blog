import utilStyles from "../styles/utils.module.css";
import styles from "../components/layout.module.css";
import Link from "next/link";

export default function () {
    return <div className={styles.container}>
        <Link href={`https://alternative.me/crypto/`}>Crypto Dashboard</Link>
        <img src="https://alternative.me/crypto/fear-and-greed-index.png" alt="Latest Crypto Fear & Greed Index"/>
    </div>
}
