import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import styles from '../BlogScreen/blog.module.scss'
import Image from 'next/image'
import axios from 'axios'
import moment from 'moment'
import { APIGetBlogs } from '../../config/API'
import Link from 'next/link'

const index = () => {
  const [blogs, setBlogs] = useState([])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(APIGetBlogs)
      console.log('Response ------->', response.data.data)
      setBlogs(response.data.data)
    } catch (err) {
      console.log('Error -------------->', err)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [])
  if (!blogs.length) {
    return <div></div>
  }
  const html = blogs[0].CONTENT
  let text = ''
  let paragraphs = html.match(/<p>.*?<\/p>/g) // ["<p>This is the first paragraph.</p>", "<p>This is the second paragraph.</p>", "<p>This is the third paragraph.</p>"]
  for (let i = 0; i < paragraphs.length; i++) {
    let paragraphText = paragraphs[i].replace(/<\/?p>/g, '') // "This is the first paragraph."
    if (text.length + paragraphText.length <= 200) {
      text += paragraphText
    } else {
      break
    }
  }
  if (text.length < 200) {
    if (paragraphs.length > 1) {
      text += paragraphs[1].replace(/<\/?p>/g, '').slice(0, 200 - text.length) // Add the first 100 - text.length characters of the second paragraph
      text += '...'
    }
  } else {
    text += '...'
  }

  return (
    <Fragment>
      <Container fluid className="bg-white">
        <Container>
          <Row>
            <Col
              style={{
                paddingBottom: '5%',
                paddingTop: '5%',
                paddingLeft: '0',
                paddingRight: '0',
              }}
            >
              <Row>
                <Col
                  className={styles.blogBanner}
                  style={{
                    paddingLeft: '0',
                    paddingRight: '0',
                  }}
                >
                  <Row>
                    <Col lg={7} md={7} sm={12} xs={12}>
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row
                            style={{
                              paddingLeft: '20px',
                              paddingRight: '20px',
                            }}
                          >
                            <Col
                              style={{
                                backgroundImage: `url('${blogs[0].IMAGE_BANNER}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Link href={`/post/${blogs[0].POST_ID}`}>
                            <Row>
                              <Col
                                style={{
                                  paddingTop: '15%',
                                  paddingLeft: '0',
                                  paddingRight: '0',
                                }}
                              >
                                <h1 className={styles.heading1}>
                                  {blogs[0].TITLE}
                                </h1>
                                <p className={styles.description}>
                                  {/* The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering both undergraduate and
                                graduate education.... */}
                                  {text}
                                </p>
                                <p className={styles.descriptionDate}>
                                  <span style={{ paddingRight: '20px' }}>
                                    {blogs[0].CATEGORIES}
                                  </span>
                                  <span>
                                    {moment(blogs[0].CREATED_AT).format(
                                      'MMMM D, YYYY'
                                    )}
                                  </span>
                                </p>
                              </Col>
                            </Row>
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={5} md={5} sm={12} xs={12}>
                      <Row>
                        <Col className={styles.popularSection}>
                          <h4 className={styles.popular}>Popular Blog</h4>
                          {blogs.slice(1, 4).map((item, index) => {
                            return (
                              <Link href={`/post/${item.POST_ID}`}>
                                <Row key={index}>
                                  <Col className={styles.popDev}>
                                    <span className={styles.popTextRight}>
                                      <h3 className={styles.heading3}>
                                        {item.TITLE}
                                      </h3>
                                      <p className={styles.descriptionDate}>
                                        <span style={{ paddingRight: '20px' }}>
                                          {item.CATEGORIES}
                                        </span>
                                        <span>
                                          {moment(blogs[0].CREATED_AT).format(
                                            'MMMM D, YYYY'
                                          )}
                                        </span>
                                      </p>
                                    </span>
                                    <span className={styles.smallImage}>
                                      <Image
                                        src={item.IMAGE_BANNER}
                                        alt="Small Blog"
                                        width={130}
                                        height={96}
                                      />
                                    </span>
                                  </Col>
                                </Row>
                              </Link>
                            )
                          })}
                          {/* <Row>
                            <Col className={styles.popDev}>
                              <span className={styles.popTextRight}>
                                <h3 className={styles.heading3}>
                                  How to get into the University of California
                                </h3>
                                <p className={styles.descriptionDate}>
                                  <span style={{ paddingRight: '20px' }}>
                                    Undergraduate
                                  </span>
                                  <span>September 15, 2022</span>
                                </p>
                              </span>
                              <span className={styles.smallImage}>
                                <Image
                                  src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                  alt="Small Blog"
                                  width={130}
                                  height={96}
                                />
                              </span>
                            </Col>
                          </Row> */}

                          {/* <Row>
                            <Col className={styles.popDev}>
                              <span className={styles.popTextRight}>
                                <h3 className={styles.heading3}>
                                  How to get into the University of California
                                </h3>
                                <p className={styles.descriptionDate}>
                                  <span style={{ paddingRight: '20px' }}>
                                    Undergraduate
                                  </span>
                                  <span>September 15, 2022</span>
                                </p>
                              </span>
                              <span className={styles.smallImage}>
                                <Image
                                  src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                  alt="Small Blog"
                                  width={130}
                                  height={96}
                                />
                              </span>
                            </Col>
                          </Row> */}

                          {/* <Row>
                            <Col className={styles.popDev}>
                              <span className={styles.popTextRight}>
                                <h3 className={styles.heading3}>
                                  How to get into the University of California
                                </h3>
                                <p className={styles.descriptionDate}>
                                  <span style={{ paddingRight: '20px' }}>
                                    Undergraduate
                                  </span>
                                  <span>September 15, 2022</span>
                                </p>
                              </span>
                              <span className={styles.smallImage}>
                                <Image
                                  src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                  alt="Small Blog"
                                  width={130}
                                  height={96}
                                />
                              </span>
                            </Col>
                          </Row> */}
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ paddingTop: '5%', paddingBottom: '5%' }}>
                      <Row>
                        <Col>
                          <h2 className={styles.mainHeading}>Latest Blogs</h2>
                        </Col>
                      </Row>
                      <Row>
                        {blogs.slice(0, 4).map((item, index) => {
                          const html = item.CONTENT
                          let text = ''
                          let paragraphs = html.match(/<p>.*?<\/p>/g) // ["<p>This is the first paragraph.</p>", "<p>This is the second paragraph.</p>", "<p>This is the third paragraph.</p>"]\
                          console.log('HTML ------------->', html)

                          console.log('HTML ------------->', paragraphs)

                          for (let i = 0; i < paragraphs.length; i++) {
                            let paragraphText = paragraphs[i].replace(
                              /<\/?p>/g,
                              ''
                            ) // "This is the first paragraph."
                            if (text.length + paragraphText.length <= 200) {
                              text += paragraphText
                            } else {
                              break
                            }
                          }
                          if (text.length < 200) {
                            if (paragraphs.length > 1) {
                              text += paragraphs[1]
                                .replace(/<\/?p>/g, '')
                                .slice(0, 200 - text.length) // Add the first 100 - text.length characters of the second paragraph
                              text += '...'
                            }
                          } else {
                            text += '...'
                          }
                          return (
                            <Link href={`/post/${item.POST_ID}`}>
                              <Col lg={3} md={3} sm={12} xs={12} key={index}>
                                <Row>
                                  <Col
                                    style={{
                                      backgroundImage: `url('${item.IMAGE_BANNER}')`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      height: '425px',
                                      margin: '10px',
                                      borderRadius: '5px',
                                    }}
                                  ></Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <h3 className={styles.heading3}>
                                      {item.TITLE}
                                    </h3>
                                    <p className={styles.description}>{text}</p>
                                    <p className={styles.descriptionDate}>
                                      <span style={{ paddingRight: '20px' }}>
                                        {item.CATEGORIES}
                                      </span>
                                      <span>
                                        {moment(item.CREATED_AT).format(
                                          'MMMM D, YYYY'
                                        )}
                                      </span>
                                    </p>
                                  </Col>
                                </Row>
                              </Col>
                            </Link>
                          )
                        })}
                        {/* <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col> */}
                        {/* <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col> */}
                        {/* <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col> */}
                        {/* <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col> */}
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ paddingBottom: '5%' }}>
                      <Row>
                        <Col>
                          <h2 className={styles.mainHeading}>Ivy League</h2>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={5} md={5} sm={12} xs={12}>
                      <Row>
                        <Col className={styles.popularSection}>
                          <h4 className={styles.popular}>Popular Blog</h4>
                          <Row>
                            <Col className={styles.popDev}>
                              <span className={styles.smallImage}>
                                <Image
                                  src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                  alt="Small Blog"
                                  width={130}
                                  height={96}
                                />
                              </span>
                              <span className={styles.popTextLeft}>
                                <h3 className={styles.heading3}>
                                  How to get into the University of California
                                </h3>
                                <p className={styles.descriptionDate}>
                                  <span style={{ paddingRight: '20px' }}>
                                    Undergraduate
                                  </span>
                                  <span>September 15, 2022</span>
                                </p>
                              </span>
                            </Col>
                          </Row>

                          <Row>
                            <Col className={styles.popDev}>
                              <span className={styles.smallImage}>
                                <Image
                                  src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                  alt="Small Blog"
                                  width={130}
                                  height={96}
                                />
                              </span>
                              <span className={styles.popTextLeft}>
                                <h3 className={styles.heading3}>
                                  How to get into the University of California
                                </h3>
                                <p className={styles.descriptionDate}>
                                  <span style={{ paddingRight: '20px' }}>
                                    Undergraduate
                                  </span>
                                  <span>September 15, 2022</span>
                                </p>
                              </span>
                            </Col>
                          </Row>

                          <Row>
                            <Col className={styles.popDev}>
                              <span className={styles.smallImage}>
                                <Image
                                  src="https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg"
                                  alt="Small Blog"
                                  width={130}
                                  height={96}
                                />
                              </span>
                              <span className={styles.popTextLeft}>
                                <h3 className={styles.heading3}>
                                  How to get into the University of California
                                </h3>
                                <p className={styles.descriptionDate}>
                                  <span style={{ paddingRight: '20px' }}>
                                    Undergraduate
                                  </span>
                                  <span>September 15, 2022</span>
                                </p>
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={7} md={7} sm={12} xs={12}>
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row
                            style={{
                              paddingLeft: '20px',
                              paddingRight: '20px',
                            }}
                          >
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                paddingTop: '15%',
                                paddingLeft: '0',
                                paddingRight: '0',
                              }}
                            >
                              <h1 className={styles.heading1}>
                                How to get into the University of California
                              </h1>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering both undergraduate and
                                graduate education....
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{ paddingTop: '5%', paddingBottom: '5%' }}>
                      <Row>
                        <Col>
                          <h2 className={styles.mainHeading}>Read more</h2>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={3} md={3} sm={12} xs={12}>
                          <Row>
                            <Col
                              style={{
                                backgroundImage:
                                  "url('https://collegepass.s3.ap-south-1.amazonaws.com/how-to-get-into-University-of-California-485x360.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '425px',
                                margin: '10px',
                                borderRadius: '5px',
                              }}
                            ></Col>
                          </Row>
                          <Row>
                            <Col>
                              <h3 className={styles.heading3}>
                                How to get into the University of California
                              </h3>
                              <p className={styles.description}>
                                The University of California is ranked among the
                                world’s best for its innovation, pioneering
                                research, and discovery. It has ten campuses,
                                with nine offering...
                              </p>
                              <p className={styles.descriptionDate}>
                                <span style={{ paddingRight: '20px' }}>
                                  Undergraduate
                                </span>
                                <span>September 15, 2022</span>
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </Fragment>
  )
}

export default index