import InteractiveIcon from "@/components/InteractiveIcon";
import ScreenContainer from "@/components/ScreenContainer";
import FONTS from "@/constants/FONTS";
import React from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";

export default function CguModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
}) {
  return (
    <Modal
      statusBarTranslucent
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
    >
      <ScreenContainer>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <InteractiveIcon
                name="close"
                type="ionicon"
                color="#000"
                size={30}
                onPress={() => setVisible(false)}
                style={{ position: "absolute", right: 10, top: 10 }}
              />
            </View>
          </View>
          <Text style={styles.title}>Mentions Légales</Text>
          <Text style={styles.text}>
            Informations Générales Nom de l'entreprise : Frienddly Forme
            juridique : Société par Actions Simplifiée (SAS) Capital social :
            150 000 € Siège social : 40 Rue du Chemin Vert, 75011 Paris Numéro
            SIRET : 977989 RCS : Paris 7610 Directeur de la publication : Imane
            Edouard
          </Text>
          <Text style={styles.title}>Hébergeur</Text>
          <Text style={styles.text}>
            Nom de l'hébergeur : Vercel Adresse de l'hébergeur : San Francisco;
            États-Unis Site web : https://vercel.com/
          </Text>
          <Text style={styles.title}>Propriété Intellectuelle</Text>
          <Text style={styles.text}>
            L'intégralité du contenu de l'application Frienddly, incluant, de
            façon non limitative, les graphismes, images, textes, vidéos,
            animations, sons, logos, gifs et icônes ainsi que leur mise en forme
            sont la propriété exclusive de la société Frienddly à l'exception
            des marques, logos ou contenus appartenant à d'autres sociétés
            partenaires ou auteurs.
          </Text>
          <Text style={styles.title}>
            Conditions Générales d'Utilisation (CGU)
          </Text>
          <Text style={styles.text}>
            L'utilisation de l'application Frienddly implique l'acceptation
            pleine et entière des conditions générales d'utilisation décrites
            ci-après. Ces conditions d'utilisation sont susceptibles d'être
            modifiées ou complétées à tout moment, les utilisateurs de
            l'application Frienddly sont donc invités à les consulter de manière
            régulière.
          </Text>
          <Text style={styles.title}>Protection des Données Personnelles</Text>
          <Text style={styles.text}>
            Frienddly s'engage à ce que la collecte et le traitement de vos
            données, effectués à partir de l'application Frienddly, soient
            conformes au règlement général sur la protection des données (RGPD)
            et à la loi Informatique et Libertés. Pour toute information ou
            exercice de vos droits Informatique et Libertés sur les traitements
            de données personnelles gérés par Frienddly, vous pouvez contacter
            son délégué à la protection des données (DPO).
          </Text>
          <Text style={styles.title}>Cookies</Text>
          <Text style={styles.text}>
            L'application Frienddly utilise des cookies pour améliorer
            l'expérience utilisateur, analyser le trafic et personnaliser les
            contenus. En utilisant l'application, vous acceptez l'utilisation
            des cookies conformément à notre politique de gestion des cookies.
          </Text>
          <Text style={styles.title}>Limitation de responsabilité</Text>
          <Text style={styles.text}>
            Frienddly ne pourra être tenue responsable des dommages directs et
            indirects causés au matériel de l’utilisateur, lors de l’accès à
            l’application Frienddly, et résultant soit de l’utilisation d’un
            matériel ne répondant pas aux spécifications indiquées, soit de
            l’apparition d’un bug ou d’une incompatibilité.
          </Text>
          <Text style={styles.title}>
            Droit applicable et attribution de juridiction
          </Text>
          <Text style={styles.text}>
            Tout litige en relation avec l’utilisation de l’application
            Frienddly est soumis au droit français. Il est fait attribution
            exclusive de juridiction aux tribunaux compétents de Paris.
          </Text>
          <Text style={styles.title}>
            Conditions Générales d'Utilisation (CGV)
          </Text>
          <Text style={styles.title}>1. Objet</Text>
          <Text style={styles.text}>
            Les présentes Conditions Générales de Vente (ci-après "CGV") ont
            pour objet de définir les conditions et modalités de vente des
            services proposés par l'application Frienddly, éditée par [Nom de
            l'entreprise] (ci-après "l'Entreprise"), auprès de ses utilisateurs
            (ci-après "le Client").
          </Text>
          <Text style={styles.title}>2. Services Proposés</Text>
          <Text style={styles.text}>
            Frienddly propose les services suivants : Abonnement premium
            permettant des fonctionnalités supplémentaires (ci-après "Frienddly
            PLUS") Publicité pour les restaurants, boutiques et associations
            antillaises Vente de tickets pour certains événements
          </Text>
          <Text style={styles.title}>
            3. Acceptation des Conditions Générales de Vente
          </Text>
          <Text style={styles.text}>
            L'achat de tout service ou produit sur l'application Frienddly
            implique l'acceptation sans réserve par le Client des présentes CGV.
          </Text>
          <Text style={styles.title}>4. Abonnement Frienddly PLUS</Text>
          <Text style={styles.text}>
            4.1 Description de l'abonnement L'abonnement Frienddly PLUS offre
            des fonctionnalités supplémentaires, incluant la possibilité de
            parler avec plus de personnes par jour, des recommandations plus
            spécifiques, des notifications avancées pour les événements
            exclusifs, et des réductions de 10% sur les événements. 4.2 Prix et
            paiement Le prix de l'abonnement Frienddly PLUS est de 5,99 € par
            mois. Le paiement s'effectue par prélèvement automatique mensuel via
            les moyens de paiement acceptés par l'application (carte bancaire,
            PayPal, etc.). 4.3 Durée et résiliation L'abonnement Frienddly PLUS
            est souscrit pour une durée indéterminée avec une reconduction
            tacite chaque mois. Le Client peut résilier son abonnement à tout
            moment via les paramètres de son compte, avec une prise d'effet à la
            fin de la période de facturation en cours.
          </Text>
          <Text style={styles.title}>5. Publicité et Partenariats</Text>
          <Text style={styles.text}>
            Les restaurants, boutiques et associations antillaises peuvent
            acheter des espaces publicitaires sur l'application et les réseaux
            sociaux de Frienddly. Les conditions tarifaires et de diffusion sont
            détaillées dans les contrats de publicité spécifiques.
          </Text>
          <Text style={styles.title}>6. Vente de Tickets pour Événements</Text>
          <Text style={styles.text}>
            Frienddly propose la vente de tickets pour certains événements
            organisés. Les conditions de vente, y compris le prix des tickets,
            les modalités de paiement et les conditions d'annulation, sont
            précisées lors de la mise en vente des tickets.
          </Text>
          <Text style={styles.title}>7. Modalités de Paiement</Text>
          <Text style={styles.text}>
            Les paiements peuvent être effectués par carte bancaire, PayPal, ou
            tout autre moyen de paiement accepté par l'application. Le Client
            garantit qu'il dispose des autorisations nécessaires pour utiliser
            le mode de paiement choisi.
          </Text>
          <Text style={styles.title}>8. Rétractation</Text>
          <Text style={styles.text}>
            Conformément à l'article L221-18 du Code de la consommation, le
            Client dispose d'un délai de 14 jours pour exercer son droit de
            rétractation sans avoir à justifier de motifs ni à payer de
            pénalités, à compter du jour de la souscription à l'abonnement
            Frienddly PLUS. Pour exercer ce droit, le Client doit notifier sa
            décision par écrit (courrier ou e-mail).
          </Text>
          <Text style={styles.title}>9. Responsabilité</Text>
          <Text style={styles.text}>
            Frienddly met tout en œuvre pour offrir un service de qualité mais
            ne peut être tenue responsable des interruptions, bugs ou
            dysfonctionnements de l'application. En aucun cas Frienddly ne
            pourra être tenue responsable des dommages indirects subis par le
            Client.
          </Text>
          <Text style={styles.title}>10. Données Personnelles</Text>
          <Text style={styles.text}>
            Les données personnelles collectées lors de l'utilisation de
            l'application sont traitées conformément à la politique de
            confidentialité de Frienddly, accessible sur le site et
            l'application. Frienddly s'engage à protéger la vie privée des
            utilisateurs et à garantir la confidentialité des informations
            fournies.
          </Text>
          <Text style={styles.title}>11. Modifications des CGV</Text>
          <Text style={styles.text}>
            Frienddly se réserve le droit de modifier les présentes CGV à tout
            moment. Les nouvelles conditions seront applicables dès leur mise en
            ligne. Il est recommandé aux Clients de consulter régulièrement les
            CGV.
          </Text>
          <Text style={styles.title}>12. Droit Applicable et Litiges</Text>
          <Text style={styles.text}>
            Les présentes CGV sont soumises au droit français. Tout litige
            relatif à leur interprétation et/ou à leur exécution relève des
            tribunaux compétents de Paris.
          </Text>
          <Text style={styles.title}>13. Contact</Text>
          <Text style={styles.text}>
            Pour toute question ou réclamation, le Client peut contacter
            Frienddly à l'adresse suivante : frienddly.outremer@gmail.com ou 40
            Rue du Chemin Vert, 75011 Paris.
          </Text>
        </ScrollView>
      </ScreenContainer>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
    height: 60,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: FONTS.poppinsBold,
  },
  text: {
    fontSize: 14,
    fontFamily: FONTS.poppinsMedium,
    marginVertical: 20,
  },
});
